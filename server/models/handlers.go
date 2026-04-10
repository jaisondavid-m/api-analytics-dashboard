package models

import "time"

type UserEndpointUsage struct {
	Path      string `json:"path"`
	Method    string `json:"method"`
	TotalHits int64  `json:"total_hits"`
}

type Result struct {
	UserID        string `json:"user_id"`
	Name          string `json:"name"`
	TotalRequests int    `json:"total_requests"`
	LastRequestAt time.Time `json:"last_request_at"`
}