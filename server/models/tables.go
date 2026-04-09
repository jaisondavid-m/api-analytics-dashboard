package models

import (
	"time"
)
type User struct {
	ID 				uint 		`gorm:"primaryKey"`
	UserID 			string 		`gorm:"size:250;not null"`
	Name 			string 		`gorm:"size:250;not null"`
	PasswordHash 	string 		`gorm:"size:255;not null"`
	Role 			string 		`gorm:"type:enum('user','admin');default:'user'"`
	LastLoginAt 	*time.Time
	LastLoginIP 	string 		`gorm:"size:45"`
	IsBanned 		bool 		`gorm:"default:false"`
	IsDeleted 		bool 		`gorm:"default:false"`
	CreatedAt 		time.Time
	UpdatedAt 		time.Time
}
type RequestLog struct {
	ID          uint        `gorm:"primaryKey"`
	UserID      *uint    
	User		User		`gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"` 
	Method      string     
	RequestBody string 		`gorm:"type:text"`
	Path        string    
	StatusCode  int        
	Latency     int64  	  
	IPAddress 	string
	CreatedAt   time.Time  
}
type UserAPIUsage struct {
	ID				uint		`gorm:"primaryKey"`
	UserID 			uint		`gorm:"size:250;uniqueIndex"`
	TotalRequests	int64 		`gorm:"default:0"`
	LastRequestAt 	time.Time
}

type EndPointUsage struct {
	ID 				uint 		`gorm:"primaryKey"`
	Path 			string 		`gorm:"size:500;uniqueIndex:idx_path_method"`
	Method 			string 		`gorm:"size:10;uniqueIndex:idx_path_method"`
	TotalHits 		int64 		`gorm:"default:0"`
	LastAccessedAt 	time.Time
}

type CountryUsage struct {
	ID 				uint 		`gorm:"primaryKey"`
	Country		 	string 		`gorm:"size:100;uniqueIndex"`
	TotalRequests 	int64		`gorm:"default:0"`
	UpdatedAt		time.Time
}

type DailyUsage struct {
	ID 				uint 		`gorm:"primaryKey"`
	Date 			time.Time 	`gorm:"type:date;uniqueIndex:unique_user_date"`
	UserID 			uint 		`gorm:"uniqueIndex:unique_user_date"`
	TotalRequests 	int64 		`gorm:"default:0"`
}