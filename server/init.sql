//users table

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(250) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    last_login_at DATETIME NULL,
    last_login_ip VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE request_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY ,
    user_id BIGINT NOT NULL,
    method VARCHAR(10),
    request_body TEXT,
    path VARCHAR(500),
    status_code INT,
    latency BIGINT,
    ip_address VARCHAR(45),
    created_at DATETIME(3)
    CONSTRAINT fk_request_logs_user
        FOREIGN KEY (user_id)
        REFRENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE user_api_usage (
    id BIGINT AUTO_INCREMENT
    user_id VARCHAR(250),
    total_requests BIGINT DEFAULT 0,
    last_request_at DATETIME(3),
);

CREATE TABLE endpoint_usage (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    path VARCHAR(500),
    method VARCHAR(10)
    total_hits,
    last_accessed_at DATETIME(3),
)

CREATE INDEX idx_path_method ON endpoint_usage(path,method);

CREATE TABLE country_usage (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    total_requests BIGINT DEFAULT 0,
    updated_at DATETIME(3)
)

CREATE TABLE daily_usage (
    id BIGINT AUTO_INCREMENT PRIMARY KEY
    date DATE,
    user_id VARCHAR(250),
    total_requests BIGINT DEFAULT 0,
    UNIQUE KEY unique_user_date (date,user_id)
)

