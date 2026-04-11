package utils

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func cookieSecurity() (http.SameSite, bool) {
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:5173"
	}

	if strings.HasPrefix(strings.ToLower(frontendURL), "https://") {
		return http.SameSiteNoneMode, true
	}

	return http.SameSiteLaxMode, false
}

func SetCookie(c *gin.Context, accessToken, refreshToken string) {
	sameSite, secure := cookieSecurity()
	c.SetSameSite(sameSite)

	c.SetCookie(
		"access_token",
		accessToken,
		60*15,
		"/",
		"",
		secure,
		true,
	)
	c.SetCookie(
		"refresh_token",
		refreshToken,
		60*60*24*7,
		"/",
		"",
		secure,
		true,
	)
}

func ClearAuthCookies(c *gin.Context) {
	sameSite, secure := cookieSecurity()
	c.SetSameSite(sameSite)

	c.SetCookie("access_token", "", -1, "/", "", secure, true)
	c.SetCookie("refresh_token", "", -1, "/", "", secure, true)
}