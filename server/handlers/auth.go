package handlers

import (
	"net/http"
	"server/config"
	"server/models"
	"server/utils"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var existing models.User
	if err := config.DB.Where("user_id = ?", req.UserID).First(&existing).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User Already Exists"})
		return
	}else if err != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError,gin.H{"error":"DB error"})
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to Hash Password"})
		return
	}
	now := time.Now()
	ip := c.ClientIP()

	user := models.User{
		UserID:       req.UserID,
		Name:         req.Name,
		PasswordHash: string(hashedPassword),
		Role:         "user",
		LastLoginAt:  &now,
		LastLoginIP:  ip,
	}
	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to Regiser"})
		return
	}
	token, err := utils.GenerateToken(user.UserID, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	utils.SetCookie(c, token)
	c.JSON(http.StatusCreated, gin.H{"message": "User Register Successfully & Logged in"})
}

func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user models.User

	if err := config.DB.Where("user_id=?", req.UserID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not Found"})
		return
	}
	if user.IsBanned {
		c.JSON(http.StatusForbidden, gin.H{"error": "User is Banned"})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Password"})
		return
	}
	now := time.Now()
	ip := c.ClientIP()

	if err := config.DB.Model(&user).Updates(map[string]interface{}{
		"last_login_at": now,
		"last_login_ip": ip,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update login info"})
		return
	}
	token, err := utils.GenerateToken(user.UserID, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	utils.SetCookie(c, token)
	c.JSON(http.StatusOK, gin.H{
		"message": "Login Successfully",
	})
}
func Logout(c *gin.Context) {
	c.SetCookie(
		"token",
		"",
		-1,
		"/",
		"",
		false,
		true,
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged out successfully",
	})
}
func Me(c *gin.Context) {
	token , err := c.Cookie("token")
	if err!=nil{
		c.JSON(http.StatusUnauthorized,gin.H{"error":"No Token Provided"})
		return
	}
	claims,err := utils.ParseToken(token)
	if err!=nil{
		c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid token"})
		return
	}
	var user models.User
	if err := config.DB.Where("user_id=?",claims.UserID).First(&user).Error; err!=nil {
		c.JSON(http.StatusNotFound,gin.H{"error":"User Not found"})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"user":gin.H{
			"user_id":user.UserID,
			"name":user.Name,
			"role":user.Role,
			"last_login_at":user.LastLoginAt,
		}
	})
}