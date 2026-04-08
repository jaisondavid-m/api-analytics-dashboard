package utils

import (
	"errors"
	"os"
	"server/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func getSecret() string {
	return os.Getenv("JWT_SECRET")
}

func getSecretBytes() ([]byte, error) {
	secret := getSecret()
	if secret == "" {
		return nil, errors.New("JWT_SECRET is not set")
	}
	return []byte(secret), nil
}

func GenerateToken(UserID string, role string) (string, error) {
	secret, err := getSecretBytes()
	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{
		"user_id": UserID,
		"role":    role,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secret)
}

func ParseToken(tokenStr string) (*models.Claims, error) {
	secret, err := getSecretBytes()
	if err != nil {
		return nil, err
	}

	token, err := jwt.ParseWithClaims(tokenStr, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})
	if claims, ok := token.Claims.(*models.Claims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}
