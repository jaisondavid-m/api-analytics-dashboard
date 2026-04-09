package config

import (
	"log"
	"server/models"
)

func Migrate() {
	err := DB.AutoMigrate(
		&models.User{},
		&models.RequestLog{},
		&models.UserAPIUsage{},
		&models.EndPointUsage{},
		&models.CountryUsage{},
		&models.DailyUsage{},
	)
	if err != nil {
		log.Fatal("Migration Failed: ",err)
	}
	log.Println("Tables Migrated Successfully")
}