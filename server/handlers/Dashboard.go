package handlers

import (
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetDashboard(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var totalUsers int64
		var totalRequests int64

		db.Model(&models.User{}).Count(&totalUsers)
		db.Model(&models.RequestLog{}).Count(&totalRequests)

		c.JSON(http.StatusOK,gin.H{
			"total_users":totalUsers,
			"total_requests" : totalRequests,
		})
	}
}

func GetUserDashboard(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		var totalRequests int64
		var lastRequest models.RequestLog

		db.Model(&models.RequestLog{}).Where("user_id=?",userId).Count(&totalRequests)
		db.Where("user_id=?",userId).Order("create_at DESC").First(&lastRequest)

		c.JSON(http.StatusOK,gin.H{
			"total_requests":totalRequests,
			"last_requests":lastRequest,
		})
	}
}