# 🛡️ API MONITOR - FULL-STACK API Observability Platform

A full-stack developer tool for monitoring , logging and analyzing HTTP API usage in real time.

---

## Features

### Authentication
- User Registration and Login with hashed passwords
- JWT-based authentication with refresh tokens
- Logout support and session management
- Role-Based access control - User and Admin
- Protected routes via AuthMiddleware and optional auth via OptionalAuth

### Real-Time Request Logging
- Logs every incoming HTTP request automatically via middleware
- Captures : HTTP method, path, status code, Latency, IP address, request body, user ID, and timestamp
- Live Log viewer with **Pasue / Live** toggle (in Live , auto-refreshes every 3 seconds)
- Color-coded HTTP methods (GET,POST,PUT,PATCH,DELETE)
- Color-coded status codes (2xx green,3xx yellow,4xx/5xx red)
- Expandable request body preview per log entry

### Analytics Dashboard
A tabbed analytics interface with four views:

#### My Usage
- Personal API usage statics for the authenticated user
- Total requests and last request timestamp

#### All Users Usage
- Admin view of API usage across every registered user
- Displays User ID, name, total requests and last request time
- Alternating row styles for readability

#### Country Usage
- Aggregates API requests by date
- Groups data client-side across user sessions
- Displays total active days and a per-date request breakdown

### API Test Playground
- Built-in interactive request tester (no external tools needed)
- Supports all five HTTP methods : GET , POST , PUT , PATCH , DELETE
- JSON body editor for non-GET/DELETE requests with syntax validation
- Displays raw response output with green/red color coding
- Dedicated test endpoints on the backend (`/test/*`)

### Backend Middleware Stack
- **Request Logger** - persists every request to the database automatically
- **Latency Tracker** - measures and records response time per request
- **Optional Auth** - indicates users on public routes without blocking them
- **CORS** - currently configured for frontend at `localhost:5173`

### Database Models
| Model | Purpose |
|---|---|
| `User` | Stores credentials , roles , login metadata | ban/delete flags |
| `RequstLog` | Full log of every HTTP request |
| `UserAPIUsage` | Aggregated request count per user |
| `EndPointUsage` | Hit count per route + method combination |
| `CountryUsage` | Requesst totals grouped by country |
| `DailyUsage` | Per-User request counts per day |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Go , Gin , Gorm |
| Database | MySQL / PostgreSQL (GORM-Compatible) |
| Frontend | React, Tailwind CSS, Vite |
| Auth | JWT ( access + refresh token ) |
| IP Geo | ip-api-com ( REST , no key required ) |
| Icons | Lucide React |

---

# Project Sturcture

```
├── server/
|  ├── main.go          # Entry point , middleware setup
|  ├── config/          # DB Connection and Migration
|  ├── models/          # Gorm data models
|  ├── routes/          # Route definitions
|  ├── handlers/        # Request handlers
|  ├── middlewares/     # Auth , Logger , Latency middleware
|  └──utils/            # IP geolocation , helpers
|
└── clients/
    ├── src/
    |   ├── api/                    # Axios API calls ( analytics , auth , content )
    |   ├── components/
    |   |   ├── HeroSection.jsx 
    |   |   ├── Loading.jsx
    |   |   ├── NavBar.jsx
    |   |   ├── LogSide.jsx         # API test playground
    |   |   └── ReqSide.jsx         # Real-Time log viewer
    |   |
    |   └── Pages/
    |       ├── Analytics.jsx
    |       ├── AllUserUsage.jsx
    |       ├── AuthPage.jsx
    |       ├── Profile.jsx
    |       ├── Home.jsx
    |       ├── UserList.jsx
    |       ├── MainConent.jsx     
    |       ├── PageNotFound.jsx
    |       ├── CountryUsagePage.jsx
    |       └── DailyUsagePage.jsx
```

## Getting Started

### Prerequisites
- Go 1.21 +
- Node.js 18+
- MySQl

### Backend

```bash
cd server
go mod tidy
# Set Your DB credentials in config/
go run main.go
# Server starts on http://localhost:8000
```

### Frontend
 
```bash
cd client
npm install
npm run dev
# App starts on http://localhost:5173
```
 
---
 
## 🔌 API Endpoints
 
### Auth
| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive tokens |
| POST | `/auth/logout` | Logout current user |
| GET | `/auth/refresh` | Refresh access token |
| GET | `/auth/check-user` | Check if a username exists |
 
### Protected (requires JWT)
| Method | Path | Description |
|---|---|---|
| GET | `/auth/me` | Get current user profile |
| GET | `/auth/logs` | Fetch all request logs |
| GET | `/auth/users` | List all users |
| GET | `/auth/usage/users` | Per-user API usage |
| GET | `/auth/usage/countries` | Usage by country |
| GET | `/auth/usage/daily` | Daily usage across all users |
| GET | `/auth/usage/daily/:user_id` | Daily usage for a specific user |
| GET | `/auth/users/:user_id/dashboard` | Dashboard stats for a user |
 
### Test Endpoints
| Method | Path |
|---|---|
| GET | `/test/get` |
| POST | `/test/post` |
| PUT | `/test/put` |
| PATCH | `/test/patch` |
| DELETE | `/test/delete` |
 
---
 
## 🌐 Environment & Configuration
 
Update CORS origin in `main.go` if your frontend runs on a different port:
 
```go
AllowOrigins: []string{"http://localhost:5173"},
```
 
The IP geolocation utility (`utils/GetCountryFromIP`) uses `ip-api.com` with a 2-second timeout and in-memory caching per IP. No API key is required.
 
---
 
## 📝 License
 
MIT