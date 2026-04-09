package models

type UserEndpointUsage struct {
	Path 		string 	`json:"path"`
	Method 		string 	`json:"method"`
	TotalHits 	int64 	`json:"total_hits"`
}