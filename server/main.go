package main

import (
	"log"
	"server/config"
	"net/http"
	"github.com/gin-gonic/gin"
)
func setupRoutes(r *gin.Engine) {
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "working"})
	})
}
func main(){
	config.Connect()
	defer config.DB.Close()
	r := gin.Default()
	r.GET("/health",func(c *gin.Context) {
		c.JSON(http.StatusOK,gin.H{"status":"ok"})
	})
	setupRoutes(r)
	log.Println("Server Running on Port 8000")
	if err := r.Run(":8000");err!=nil{
		log.Fatal(err)
	}
}