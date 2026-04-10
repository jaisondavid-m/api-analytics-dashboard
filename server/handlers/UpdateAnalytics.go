package handlers

import (
	"log"
	"time"
	"server/utils"

	"gorm.io/gorm"
)

func UpdateAnalytics(db *gorm.DB,uid uint,path,method,ip string) {
	now := time.Now()
	today := now.Truncate(24*time.Hour)

	if err := db.Exec(`
		INSERT INTO user_api_usages (user_id,total_requests,last_request_at)
		VALUES (?, 1, ?)
		ON DUPLICATE KEY UPDATE
			total_requests = total_requests + 1,
			last_request_at = ?
	`,uid,now,now).Error;err != nil {
		log.Println("user_api_usage error:",err)
	}

	if err := db.Exec(`
		INSERT INTO end_point_usages (path, method, total_hits, last_accessed_at)
		VALUES (?, ?, 1, ?)
		ON  DUPLICATE KEY UPDATE
			total_hits = total_hits + 1,
			last_accessed_at = ?
	`,path,method,now,now).Error; err != nil {
		log.Println("endpoint_usage error:",err)
	}

	if err := db.Exec(`
		INSERT INTO daily_usages (date,user_id,total_requests)
		VALUES (?, ?, 1)
		ON DUPLICATE KEY UPDATE
			total_requests = total_requests + 1
	`,today,uid).Error; err!=nil {
		log.Println("daily_usage error:",err)
	}

	country := utils.GetCountryFromIP(ip)

	if err := db.Exec(`
		INSERT INTO country_usages (country, total_requests, updated_at)
		VALUES (?, 1, ?)
		ON DUPLICATE KEY UPDATE
			total_requests = total_requests + 1,
			updated_at = ?
	`,country,now,now).Error; err != nil {
		log.Println("country_usage error",err)
	}
}