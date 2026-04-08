package utils

import (
	"os"
	"server/models"
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

func ParseToken(tokenStr string) (*models.Claims,error) {
	token,err:=jwt.ParseWithClaims(tokenStr,&models.Claims{},func(token *jwt.Token) (interface{},error) {
		return []byte(os.Getenv("JWT_SECRET")),nil
	})
	if claims,ok:=token.Claims.(*models.Claims); ok && token.Valid {
		return claims,nil
	} else {
		return nil,err
	}
}