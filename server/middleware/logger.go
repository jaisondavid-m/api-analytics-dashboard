package middleware

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RequestLogger(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		var bodyByte []byte
		var maskedBody string
		var bodyMap map[string]interface{}
		if c.Request.Body != nil {
			bodyByte, _ = io.ReadAll(c.Request.Body)
		}
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyByte))
		c.Next()
		latency := time.Since(start).Milliseconds()
		status := c.Writer.Status()
		method := c.Request.Method
		path := c.Request.URL.Path
		ip := c.ClientIP()

		userID, _ := c.Get("user_id")

		if err := json.Unmarshal(bodyByte, &bodyMap); err == nil {
			if _, ok := bodyMap["password"]; ok {
				bodyMap["password"] = "*******"
			} else {
				maskedBody = string(bodyByte)
			}
			maskedJSON , _ := json.Marshal(bodyMap)
			maskedBody = string(maskedJSON)
		}

		logEntry := models.RequestLog{
			UserID:      fmt.Sprint(userID),
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
	}
}
