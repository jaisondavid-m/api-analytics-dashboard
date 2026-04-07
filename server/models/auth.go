package models

type RegisterRequest struct {
	Name string `json:"name" binding:"required"`
	UserID string `json:"user_id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginRequest struct {
	UserID string `json:"user_id" binding:"required"`
	Password string `json:"password" binding:"required"`
}