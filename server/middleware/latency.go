package middleware

import (
	"math/rand/v2"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

func LatencyMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if os.Getenv("ENV") != "development" {
			time.Sleep(time.Duration(rand.IntN(400)+100)*time.Millisecond)
		}
		c.Next()
	}
}