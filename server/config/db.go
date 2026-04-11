package config

import (
	"crypto/tls"
	"crypto/x509"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	mysqlDriver "github.com/go-sql-driver/mysql"
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

	if dsn == "" {
		log.Fatal("DB_DSN is not set")
	}
	
	rootCertPool := x509.NewCertPool()
	pem,err := os.ReadFile("cert.pem")
	if err != nil {
		log.Fatal("Failed to read CA cert:",err)
	}
	if ok := rootCertPool.AppendCertsFromPEM(pem); !ok {
		log.Fatal("Failed to append CA cert")
	}
	tlsConfig := &tls.Config{
		RootCAs: rootCertPool,
		MinVersion: tls.VersionTLS12,
	}
	err = mysqlDriver.RegisterTLSConfig("custom",tlsConfig)
	if err != nil {
		log.Fatal(err)
	}

	DB,err = gorm.Open(mysql.Open(dsn),&gorm.Config{})
	if err!=nil{
		log.Fatal("Failed to connect DB:",err)
	}

	sqlDB , err := DB.DB()
	if err != nil {
		log.Fatal("Failed to get DB instance:",err)
	}

	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetConnMaxLifetime(5*time.Minute)

	log.Println("DB connected Successfully")
}