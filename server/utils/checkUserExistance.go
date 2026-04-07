package utils

import (
	"net/http"
	"server/config"
	"server/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CheckUserExists(c *gin.Context){
	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest,gin.H{"error":"user_id cannot be empty"})
		return
	}
	var user models.User
	err := config.DB.Where("user_id",userID).First(&user).Error
	if err == nil {
		c.JSON(http.StatusOK,gin.H{"exists":true})
		return
	}
	if err == gorm.ErrRecordNotFound{
		c.JSON(http.StatusOK,gin.H{"exists":false})
		return
	}
	c.JSON(http.StatusInternalServerError,gin.H{"error":"db err"})
}