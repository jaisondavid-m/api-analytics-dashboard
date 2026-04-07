package routes

import (
	"net/http"
	"server/handlers"
	"server/utils"

	"github.com/gin-gonic/gin"
)
func SetUpRoutes(r *gin.Engine){
	r.GET("/health",func(c *gin.Context) {
		c.JSON(http.StatusOK,gin.H{"status":"ok"})
	})
	auth := r.Group("/auth")
	{
		auth.POST("/register",handlers.Register)
		auth.POST("/login",handlers.Login)
		auth.POST("/logout",handlers.Logout)
		auth.GET("/check-user",utils.CheckUserExists)
	}
}