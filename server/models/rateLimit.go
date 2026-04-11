package models

import (
	"time"
)

type Client struct {
	Count int
	LastReset time.Time
}