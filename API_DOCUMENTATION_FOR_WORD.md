# EMPLOYMENT DIRECTORY
## API DOCUMENTATION

---

**Project:** Employment Directory  
**Version:** 1.0.0  
**Date:** December 2024  
**Base URL:** `http://localhost:3000/api` (Development)  
**Production URL:** `https://your-domain.com/api`

---

## TABLE OF CONTENTS

1. [Introduction](#1-introduction)
2. [Authentication](#2-authentication)
3. [Authentication Endpoints](#3-authentication-endpoints)
4. [Job Endpoints](#4-job-endpoints)
5. [Application Endpoints](#5-application-endpoints)
6. [Error Responses](#6-error-responses)
7. [Status Codes](#7-status-codes)
8. [Testing Examples](#8-testing-examples)

---

## 1. INTRODUCTION

### 1.1 Overview
This document provides comprehensive documentation for all API endpoints in the Employment Directory application. The API follows RESTful principles and uses JSON for data exchange.

### 1.2 Base URL
```
Development: http://localhost:3000/api
Production:  https://your-domain.com/api
```

### 1.3 Authentication
Most endpoints require authentication using JWT (JSON Web Tokens). Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### 1.4 Request Format
- **Content-Type:** `application/json`
- **Request Body:** JSON format
- **Query Parameters:** For filtering and search

### 1.5 Response Format
All responses are in JSON format with the following structure:

**Success Response:**
```json
{
  "success": true,
  "data": {...}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 2. AUTHENTICATION

### 2.1 Getting a Token
Tokens are obtained through the login endpoint (`POST /api/auth/login`) or registration endpoint (`POST /api/auth/register`). The token is returned in the response and should be stored securely.

### 2.2 Using a Token
Include the token in the Authorization header for protected endpoints:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.3 Token Expiration
Tokens expire after 30 days. Users must login again to obtain a new token.

---

## 3. AUTHENTICATION ENDPOINTS

### 3.1 Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Creates a new user account and returns a JWT token.

**Authentication:** Not required

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "job_seeker"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's full name |
| email | string | Yes | Valid email address |
| password | string | Yes | Minimum 6 characters |
| role | string | No | "job_seeker" or "employer" (default: "job_seeker") |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker"
  }
}
```

**Error Responses:**

**400 Bad Request - User Already Exists:**
```json
{
  "success": false,
  "message": "User already exists"
}
```

**400 Bad Request - Validation Error:**
```json
{
  "success": false,
  "message": "Password must be at least 6 characters"
}
```

---

### 3.2 Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticates a user and returns a JWT token.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | User's password |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker"
  }
}
```

**Error Responses:**

**401 Unauthorized - Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**400 Bad Request - Missing Fields:**
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

---

### 3.3 Get Current User

**Endpoint:** `GET /api/auth/me`

**Description:** Retrieves the profile of the currently authenticated user.

**Authentication:** Required (JWT token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "profile": {
      "phone": null,
      "address": null,
      "skills": [],
      "experience": null,
      "resume": null
    },
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Error Responses:**

**401 Unauthorized - No Token:**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**401 Unauthorized - Invalid Token:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

---

## 4. JOB ENDPOINTS

### 4.1 Get All Jobs

**Endpoint:** `GET /api/jobs`

**Description:** Retrieves all job listings with optional search and filtering.

**Authentication:** Not required

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string | No | Search term for title, company, or description |
| type | string | No | Filter by job type (full-time, part-time, contract, internship) |
| location | string | No | Filter by location (case-insensitive partial match) |

**Example Request:**
```
GET /api/jobs?search=developer&type=full-time&location=New York
```

**Response (200 OK):**
```json
{
  "success": true,
  "jobs": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Senior Developer",
      "description": "We are looking for an experienced developer...",
      "company": "Tech Corp",
      "location": "New York, NY",
      "salary": "$80,000 - $100,000",
      "type": "full-time",
      "requirements": [
        "5+ years experience",
        "Proficiency in JavaScript",
        "React knowledge"
      ],
      "employer": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Jane Employer",
        "email": "employer@example.com"
      },
      "applications": [],
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

---

### 4.2 Create Job

**Endpoint:** `POST /api/jobs`

**Description:** Creates a new job posting. Only employers can create jobs.

**Authentication:** Required (JWT token - Employer role only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Senior Developer",
  "description": "We are looking for an experienced developer with strong skills in JavaScript and React.",
  "company": "Tech Corp",
  "location": "New York, NY",
  "salary": "$80,000 - $100,000",
  "type": "full-time",
  "requirements": [
    "5+ years experience",
    "Proficiency in JavaScript",
    "React knowledge",
    "Node.js experience"
  ]
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Job title |
| description | string | Yes | Detailed job description |
| company | string | Yes | Company name |
| location | string | Yes | Job location |
| salary | string | Yes | Salary range or amount |
| type | string | No | Job type: "full-time", "part-time", "contract", "internship" (default: "full-time") |
| requirements | array | No | Array of requirement strings |

**Response (201 Created):**
```json
{
  "success": true,
  "job": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Senior Developer",
    "description": "We are looking for an experienced developer...",
    "company": "Tech Corp",
    "location": "New York, NY",
    "salary": "$80,000 - $100,000",
    "type": "full-time",
    "requirements": [
      "5+ years experience",
      "Proficiency in JavaScript",
      "React knowledge"
    ],
    "employer": "507f1f77bcf86cd799439011",
    "applications": [],
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Error Responses:**

**403 Forbidden - Not Employer:**
```json
{
  "success": false,
  "message": "Only employers can create jobs"
}
```

**401 Unauthorized - No Token:**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### 4.3 Get Job by ID

**Endpoint:** `GET /api/jobs/[id]`

**Description:** Retrieves detailed information about a specific job.

**Authentication:** Not required

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Job ID |

**Example Request:**
```
GET /api/jobs/507f1f77bcf86cd799439012
```

**Response (200 OK):**
```json
{
  "success": true,
  "job": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Senior Developer",
    "description": "We are looking for an experienced developer...",
    "company": "Tech Corp",
    "location": "New York, NY",
    "salary": "$80,000 - $100,000",
    "type": "full-time",
    "requirements": [
      "5+ years experience",
      "Proficiency in JavaScript",
      "React knowledge"
    ],
    "employer": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Jane Employer",
      "email": "employer@example.com"
    },
    "applications": [],
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found:**
```json
{
  "success": false,
  "message": "Job not found"
}
```

---

## 5. APPLICATION ENDPOINTS

### 5.1 Submit Application

**Endpoint:** `POST /api/applications`

**Description:** Submits a job application. Only job seekers can apply.

**Authentication:** Required (JWT token - Job Seeker role only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "jobId": "507f1f77bcf86cd799439012",
  "coverLetter": "I am writing to express my interest in this position. I have 5 years of experience in web development..."
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| jobId | string | Yes | ID of the job being applied to |
| coverLetter | string | Yes | Applicant's cover letter |

**Response (201 Created):**
```json
{
  "success": true,
  "application": {
    "_id": "507f1f77bcf86cd799439013",
    "job": "507f1f77bcf86cd799439012",
    "applicant": "507f1f77bcf86cd799439011",
    "status": "pending",
    "coverLetter": "I am writing to express my interest...",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Already Applied:**
```json
{
  "success": false,
  "message": "You have already applied for this job"
}
```

**400 Bad Request - Missing Fields:**
```json
{
  "success": false,
  "message": "Please provide job ID and cover letter"
}
```

**403 Forbidden - Not Job Seeker:**
```json
{
  "success": false,
  "message": "Only job seekers can apply"
}
```

**404 Not Found - Job Doesn't Exist:**
```json
{
  "success": false,
  "message": "Job not found"
}
```

---

### 5.2 Get Applications

**Endpoint:** `GET /api/applications`

**Description:** Retrieves user's applications. Returns different data based on user role:
- **Job Seekers:** See their own applications
- **Employers:** See applications for their posted jobs

**Authentication:** Required (JWT token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK) - Job Seeker:**
```json
{
  "success": true,
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "job": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Senior Developer",
        "company": "Tech Corp",
        "location": "New York, NY"
      },
      "applicant": "507f1f77bcf86cd799439011",
      "status": "pending",
      "coverLetter": "I am writing to express my interest...",
      "createdAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

**Response (200 OK) - Employer:**
```json
{
  "success": true,
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "job": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Senior Developer",
        "company": "Tech Corp"
      },
      "applicant": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "profile": {
          "skills": ["JavaScript", "React"],
          "experience": "3 years"
        }
      },
      "status": "pending",
      "coverLetter": "I am writing to express my interest...",
      "createdAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## 6. ERROR RESPONSES

All endpoints may return the following standard error responses:

### 6.1 400 Bad Request
Returned when request data is invalid or missing required fields.

```json
{
  "success": false,
  "message": "Error description"
}
```

### 6.2 401 Unauthorized
Returned when authentication is required but not provided, or token is invalid.

```json
{
  "success": false,
  "message": "Unauthorized" or "Invalid token"
}
```

### 6.3 403 Forbidden
Returned when user doesn't have permission to perform the action.

```json
{
  "success": false,
  "message": "Access denied"
}
```

### 6.4 404 Not Found
Returned when requested resource doesn't exist.

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 6.5 500 Internal Server Error
Returned when server encounters an error.

```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details (in development mode)"
}
```

---

## 7. STATUS CODES

| Code | Description | Usage |
|------|-------------|-------|
| 200 | OK | Successful GET, PUT, PATCH requests |
| 201 | Created | Successful POST requests creating resources |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server error |

---

## 8. TESTING EXAMPLES

### 8.1 Using cURL

**Register User:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "job_seeker"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Jobs:**
```bash
curl http://localhost:3000/api/jobs
```

**Create Job (with token):**
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Developer",
    "description": "Job description",
    "company": "Tech Corp",
    "location": "NYC",
    "salary": "$80k",
    "type": "full-time"
  }'
```

### 8.2 Using Postman

1. Create a new collection "Employment Directory API"
2. Set base URL: `http://localhost:3000/api`
3. For authenticated requests:
   - Add Authorization header
   - Type: Bearer Token
   - Token: Paste your JWT token
4. Save requests for each endpoint

### 8.3 Test Credentials

After seeding the database, you can use:

- **Admin:** admin@test.com / admin123
- **Job Seeker:** jobseeker@test.com / password123
- **Employer:** employer@test.com / password123

---

## APPENDIX

### A. Data Models

**User Model:**
- _id: ObjectId
- name: String
- email: String (unique)
- password: String (hashed)
- role: Enum ['job_seeker', 'employer', 'admin']
- profile: Object
- createdAt: Date
- updatedAt: Date

**Job Model:**
- _id: ObjectId
- title: String
- description: String
- company: String
- location: String
- salary: String
- type: Enum
- requirements: Array
- employer: ObjectId (ref: User)
- applications: Array[ObjectId]
- createdAt: Date
- updatedAt: Date

**Application Model:**
- _id: ObjectId
- job: ObjectId (ref: Job)
- applicant: ObjectId (ref: User)
- status: Enum
- coverLetter: String
- createdAt: Date
- updatedAt: Date

---

**Document Version:** 1.0.0  
**Last Updated:** December 2024  
**Contact:** [Your Contact Information]

---

*End of API Documentation*

