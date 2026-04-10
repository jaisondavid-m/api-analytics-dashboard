package utils

import (
	"encoding/json"
	"net/http"
	"server/models"
	"time"
)

var ipCache = make(map[string]string)

func GetCountryFromIP(ip string) string {

	if country,ok := ipCache[ip]; ok {
		return country
	}

	client := http.Client{
		Timeout: 2*time.Second,
	}

	resp,err := client.Get("http://ip-api.com/json/"+ip)

	if err!=nil {
		ipCache[ip] = "India"
		return "India"
	}

	defer resp.Body.Close()
	var data models.IPAPIResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		ipCache[ip] = "India"
		return "India"
	}
	if data.Status != "success" || data.Country == "" {
		ipCache[ip] = "India"
		return "India"
	}
	ipCache[ip] = data.Country
	return data.Country
}