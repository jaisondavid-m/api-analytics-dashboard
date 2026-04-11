package routes

import (
	"net/http"
	"server/config"
	"server/handlers"
	"server/middleware"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes(r *gin.Engine) {
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
	auth := r.Group("/auth")
	{
		auth.POST("/register", handlers.Register)
		auth.POST("/login", handlers.Login)
		auth.POST("/logout", handlers.Logout)
		auth.GET("/check-user", utils.CheckUserExists)
		auth.GET("/refresh", handlers.Refresh)
	}
	protected := auth.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/me", handlers.Me)
		protected.DELETE("/user/:id",handlers.DeleteUser)
		protected.PATCH("/user/ban/:id",handlers.BanUser)
		protected.PATCH("/user/unban/:id",handlers.UnbanUser)
		protected.GET("/user/ban-status/:id",handlers.CheckBanStatus)
		protected.GET("/logs", handlers.GetLogs(config.DB))
		protected.GET("/users",handlers.GetUsers(config.DB))
		protected.GET("/usage/users",handlers.GetUserAPIUsage(config.DB))
		protected.GET("/usage/countries",handlers.GetCountryUsage(config.DB))
		protected.GET("/usage/daily",handlers.GetDailyUsage(config.DB))
		protected.GET("/usage/daily/:user_id",handlers.GetUserDailyUsage(config.DB))
		protected.GET("/users/:user_id/dashboard",handlers.GetUserDashboard(config.DB))
	}
	test := r.Group("/test")
	{
		test.GET("/get",handlers.TestGet)
		test.POST("/post",handlers.TestPost)
		test.PUT("/put",handlers.TestPut)
		test.PATCH("/patch",handlers.TestPatch)
		test.DELETE("/delete",handlers.TestDelete)
	}
	r.NoRoute(func(c *gin.Context){
		c.JSON(http.StatusNotFound,gin.H{"error":"Route Not FOund"})
	})
}