package middleware

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token , err := c.Cookie("access_token")
		if err!=nil{
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"error":"No token found"})
			return
		}
		claims , err := utils.ParseToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"error":"Invalid TOken"})
			return 
		}
		c.Set("user_id",claims.UserID)
		c.Set("role",claims.Role)
		c.Next()
	}
}
func OptionalAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token , err := c.Cookie("access_token")
		if err == nil {
			if claims,err := utils.ParseToken(token); err == nil {
				c.Set("user_id",claims.UserID)
				c.Set("role",claims.Role)
			}
		}
		c.Next()
	}
}