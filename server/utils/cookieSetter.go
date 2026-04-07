package utils

import "github.com/gin-gonic/gin"

func SetCookie(c *gin.Context, token string) {
	c.SetCookie(
		"token",
		token,
		3600*24,
		"/",
		"",
		false,
		true,
	)
}