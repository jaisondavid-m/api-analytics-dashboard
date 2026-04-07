package main

import (
	"log"
	"server/config"
	"server/routes"
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
	r := gin.Default()
	routes.SetUpRoutes(r)
	log.Println("Server Running on Port 8000")
	if err := r.Run(":8000");err!=nil{
		log.Fatal(err)
	}
}