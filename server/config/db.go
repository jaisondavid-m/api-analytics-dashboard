package config

import (
	"log"
	"os"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
func Connect(){
	err:=godotenv.Load()
	if err!=nil{
		log.Println("No env file found")
	}
	dsn := os.Getenv("DB_DSN")
	if(dsn == ""){
	}
	DB,err = gorm.Open(mysql.Open(dsn),&gorm.Config{})
	if err!=nil{
		log.Fatal("Failed to connect DB:",err)
	}
	log.Println("DB connected Successfully")
}