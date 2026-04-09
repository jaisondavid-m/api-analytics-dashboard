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
	UserID      uint		`gorm:"not null"`    
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
	UserID 			string		`gorm:"size:250"`
	TotalRequests	int64 		`gorm:"default:0"`
	LastRequestAt 	time.Time
}

type