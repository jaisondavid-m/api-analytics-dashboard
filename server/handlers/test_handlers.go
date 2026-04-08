package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func successResponse(c *gin.Context,status int,message string , data interface{}){
	c.JSON(status,gin.H{
		"success":true,
		"message":message,
		"data":data,
	})
}
func errorResponse(c *gin.Context,status int,err error) {
	c.JSON(status,gin.H{
		"success":false,
		"error":err.Error(),
	})
}

func TestGet(c *gin.Context) {
	successResponse(c,http.StatusOK,"GET request successful",gin.H{"method":"GET"})
}

func TestPost(c *gin.Context) {
	var body map[string]interface{}
	if err := c.ShouldBindJSON(&body);err!=nil{
		errorResponse(c,http.StatusBadRequest,err)
		return
	}
	successResponse(c,http.StatusCreated,"POST request Successfull",gin.H{"method":"POST","body":body})
}

func TestPut(c *gin.Context) {
	var body map[string]interface{}
	if err := c.ShouldBindJSON(&body);err != nil {
		errorResponse(c, http.StatusBadRequest, err)
		return
	}
	successResponse(c,http.StatusOK,"PUT request successful",gin.H{"method":"PUT","updated":body,})
}

func TestPatch(c *gin.Context) {
	var body map[string]interface{}
	if err := c.ShouldBindJSON(&body); err != nil{
		errorResponse(c,http.StatusBadRequest,err)
		return
	}
	successResponse(c,http.StatusOK,"PATCH request Successful",gin.H{"method":"PATCH","patched":body})
}

func TestDelete(c *gin.Context) {
	successResponse(c,http.StatusOK,"DELETE request successful",gin.H{
		"method":"DELETE",
	})
}