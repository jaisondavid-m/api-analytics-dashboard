package main

import (
	"log"
	"os"
	"server/config"
	"server/middleware"
	"server/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)
func setupRoutes(r *gin.Engine) {
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "working"})
	})
}
func main(){
	config.Connect()
	config.Migrate()

	sqlDB,err := config.DB.DB()
	if err!=nil{
		log.Fatal("Failed to Load DataBase",err)
	}

	defer sqlDB.Close()

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:5173"
	}

	r := gin.Default()
	r.SetTrustedProxies(nil)
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"https://api-analytics-dashboard-blush.vercel.app"},
		AllowMethods: []string{"GET","POST","PUT","PATCH","DELETE"},
		AllowHeaders: []string{"Origin","Content-Type","Authorization"},
		AllowCredentials: true,
	}))
	r.Use(func(c *gin.Context) {
		c.Header("X-Frame-Options","DENY")
		c.Header("X-Content-Type-Options","nosniff")
		c.Header("Referrer-policy","strict-origin-when-cross-origin")
		c.Next()
	})
	r.Use(middleware.OptionalAuth())
	r.Use(middleware.RateLimit(100,time.Minute))
	r.Use(middleware.RequestLogger(config.DB))
	r.Use(middleware.LatencyMiddleware())
	routes.SetUpRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Println("Server Running on Port 8000")
	if err := r.Run(":" + port);err!=nil{
		log.Fatal(err)
	}
}
