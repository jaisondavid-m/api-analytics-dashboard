package middleware

import (
	"net/http"
	"server/models"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

var (
	clients = make(map[string]*models.Client)
	mu sync.Mutex
)

func RateLimit(limit int,window time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		mu.Lock()
		client,exists := clients[ip]
		if !exists {
			clients[ip] = &models.Client{
				Count: 1,
				LastReset: time.Now(),
			}
			mu.Unlock()
			c.Next()
			return
		}
		//Reset if time window is passed
		if time.Since(client.LastReset) > window {
			client.Count = 1
			client.LastReset = time.Now()
			mu.Unlock()
			c.Next()
			return
		}
		// Check limit
		if client.Count >= limit {
			mu.Unlock()
			c.JSON(http.StatusTooManyRequests,gin.H{
				"error":"Too many Requests , Please Try Again Later.",
			})
			c.Abort()
		}
		client.Count++
		mu.Unlock()
		c.Next()
	}
}