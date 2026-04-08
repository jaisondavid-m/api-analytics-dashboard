package models

import "github.com/golang-jwt/jwt/v5"

type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
	UserID   string `json:"user_id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginRequest struct {
	UserID   string `json:"user_id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Claims struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}