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