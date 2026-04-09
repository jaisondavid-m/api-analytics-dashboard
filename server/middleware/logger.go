package middleware

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"server/handlers"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RequestLogger(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		var bodyByte []byte
		if c.Request.Body != nil {
			bodyByte, _ = io.ReadAll(c.Request.Body)
		}
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyByte))
		defer func() {
			if rec := recover(); rec != nil {
				c.Writer.WriteHeader(500)
				log.Println("Recovered From Panic: ", rec)
			}
		}()
		c.Next()
		latency := time.Since(start).Milliseconds()
		status := c.Writer.Status()
		method := c.Request.Method
		path := c.Request.URL.Path
		ip := c.ClientIP()
		userID, _ := c.Get("user_id")

		maskedBody := ""
		var bodyMap map[string]interface{}
		if len(bodyByte) > 0 {
			if err := json.Unmarshal(bodyByte, &bodyMap); err == nil {
				if _, ok := bodyMap["password"]; ok {
					bodyMap["password"] = "******"
				}
				maskedJSON, _ := json.Marshal(bodyMap)
				maskedBody = string(maskedJSON)
			} else {
				maskedBody = string(bodyByte)
			}
		}
		var uid *uint
		if userID != nil {
			switch v := userID.(type) {
			case uint:
				uid = &v
			case string:
				var user models.User
				if err := db.Select("id").Where("user_id = ?", v).First(&user).Error; err == nil {
					uid = &user.ID
				}
			}
		}
		logEntry := models.RequestLog{
			UserID:      uid,
			Method:      method,
			Path:        path,
			StatusCode:  status,
			Latency:     latency,
			IPAddress:   ip,
			RequestBody: maskedBody,
		}
		go func() {
			if err := db.Create(&logEntry).Error; err != nil {
				log.Println("log error", err)
			}
		}()
		if uid != nil {
			handlers.UpdateAnalytics(db, *uid, path, method, ip)
		}
	}
}
