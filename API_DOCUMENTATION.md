# API Documentation - Employment Directory

## Base URL
```
http://localhost:3000/api
```
(Production URL will vary based on deployment)

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User

**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "job_seeker"  // Optional: "job_seeker" or "employer"
}
```

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

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### 2. Login User

**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

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

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User

**GET** `/api/auth/me`

Get authenticated user's profile.

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

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

---

## Job Endpoints

### 4. Get All Jobs

**GET** `/api/jobs`

Retrieve all job listings with optional search and filtering.

**Query Parameters:**
- `search` (optional): Search term for title, company, or description
- `type` (optional): Job type filter (full-time, part-time, contract, internship)
- `location` (optional): Location filter

**Example:**
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

### 5. Create Job

**POST** `/api/jobs`

Create a new job posting (Employer only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
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
  ]
}
```

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

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Only employers can create jobs"
}
```

---

### 6. Get Job by ID

**GET** `/api/jobs/[id]`

Get detailed information about a specific job.

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

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Job not found"
}
```

---

## Application Endpoints

### 7. Submit Application

**POST** `/api/applications`

Submit a job application (Job Seeker only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "jobId": "507f1f77bcf86cd799439012",
  "coverLetter": "I am writing to express my interest in this position..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "application": {
    "_id": "507f1f77bcf86cd799439013",
    "job": "507f1f77bcf86cd799439012",
    "applicant": "507f1f77bcf86cd799439011",
    "status": "pending",
    "coverLetter": "I am writing to express my interest in this position...",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "You have already applied for this job"
}
```

---

### 8. Get Applications

**GET** `/api/applications`

Get user's applications. Returns different data based on user role:
- **Job Seekers**: See their own applications
- **Employers**: See applications for their posted jobs

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

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message here"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized" or "Invalid token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details (in development mode)"
}
```

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"job_seeker"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Jobs
```bash
curl http://localhost:3000/api/jobs
```

### Create Job (with token)
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Developer","description":"Job description","company":"Tech Corp","location":"NYC","salary":"$80k","type":"full-time"}'
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting in production to prevent abuse.

---

**Last Updated**: December 2024
**Version**: 1.0.0

