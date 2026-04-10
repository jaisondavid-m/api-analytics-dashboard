package handlers

import (
	"net/http"
	"server/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetLogs(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var logs []models.RequestLog
		if err := db.Order("created_at DESC").Limit(100).Find(&logs).Error; err!=nil {
			c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to Fetch Logs"})
			return 
		}
		c.JSON(http.StatusOK,logs)
	}
}

func GetUsers(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []models.User
		if err := db.Find(&users).Error; err != nil {
			c.JSON(http.StatusInternalServerError,gin.H{"error":"failed to fetch users"})
			return 
		}
		c.JSON(http.StatusOK,users)
	}
}

func GetUserAPIUsage(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var result []models.Result
		err := db.Table("user_api_usages").Select("users.user_id,users.name,user_api_usages.total_requests,user_api_usages.last_request_at").Joins("JOIN users ON users.id = user_api_usages.user_id").Scan(&result).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to Fetch usage"})
			return
		}
		c.JSON(http.StatusOK,result)
	}
}

func GetEndpointUsage(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var endpoints []models.EndPointUsage
		if err := db.Find(&endpoints).Error; err != nil {
			c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to Fetch Endpoinnts usage"})
			return 
		}
		c.JSON(http.StatusOK,endpoints)
	}
}

func GetCountryUsage(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var countries []models.CountryUsage
		if err := db.Find(&countries).Error; err != nil {
			c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to Fetch Country wise Usage"})
			return 
		}
		c.JSON(http.StatusOK,countries)
	}
}

func GetDailyUsage(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var daily []models.DailyUsage
		if err := db.Order("date DESC").Find(&daily).Error; err != nil {
			c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to Fetch Daily Usage"})
			return
		}
		c.JSON(http.StatusOK,daily)
	}
}

func GetUserDailyUsage(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("user_id")
		var daily []models.DailyUsage
		if err := db.Where("user_id = ? ",userID).Order("date DESC").Find(&daily).Error; err != nil {
			c.JSON(http.StatusInternalServerError,gin.H{
				"error":"Failed to fetch user daily usage",
			})
			return 
		}
		c.JSON(http.StatusOK,daily)
	}
}

