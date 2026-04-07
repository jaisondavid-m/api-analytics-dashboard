package config

import (
	"database/sql"
	"log"
	"os"
	"github.com/joho/godotenv"
	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB
func Connect(){
	err:=godotenv.Load()
	if err!=nil{
		log.Println("No env file found")
	}
	dsn := os.Getenv("DB_DSN")
	if(dsn == ""){
		log.Fatal("DB_DSN not set in env")
	}
	DB,err = sql.Open("mysql",dsn)
	if err!=nil{
		log.Fatal(err)
	}
	if err = DB.Ping();err!=nil{
		log.Fatal("Failed to Connect DB",err)
	}
	log.Println("DB connected Successfully")
}