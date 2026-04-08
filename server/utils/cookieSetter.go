package utils

import "github.com/gin-gonic/gin"

func SetCookie(c *gin.Context, accessToken, refreshToken string) {
	c.SetCookie(
		"access_token",
		accessToken,
		60*15,
		"/",
		"localhost",
		false,
		true,
	)
	c.SetCookie(
		"refresh_token",
		refreshToken,
		60*60*24*7,
		"/",
		"localhost",
		false,
		true,
	)
}