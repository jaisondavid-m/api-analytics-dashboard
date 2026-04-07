package utils

import (
	"os"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(getSecret())

func getSecret() string {
	secret := os.Getenv("JWT_SECRET")
	return secret
}

func GenerateToken(UserID string , role string)(string, error){
	claims := jwt.MapClaims{
		"user_id":UserID,
		"role":role,
		"exp":time.Now().Add(24*time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,claims)
	return token.SignedString(jwtSecret)
}
