package handlers

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func Refresh(c *gin.Context){
	refreshToken , err := c.Cookie("refresh_token")
	if err!=nil{
		c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid Refresh Token"})
		return
	}
	claims , err := utils.ParseToken(refreshToken)
	if err!=nil{
		c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid Token"})
		return
	}
	newAccessToken , err := utils.GenerateAccessToken(claims.UserID,claims.Role)
	if err!=nil {
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Server Error"})
		return
	}
	c.SetCookie(
		"access_token",
		newAccessToken,
		60*15,
		"/",
		"localhost",
		false,
		true,
	)
	c.JSON(http.StatusOK,gin.H{"message":"Token Refreshed"})
}