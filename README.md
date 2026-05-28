# 🔐 Secure User Authentication System

> **Assignment Project** | Assigned: 26 May 2026  
> **Author:** Gudala Venkata Satyanarayana | Back-End Developer  
> **Role:** Back-End Developer

A production-grade, secure authentication and authorization backend built with Node.js, Express.js, and MongoDB. Implements industry-standard security practices including JWT token rotation, bcrypt password hashing, rate limiting, and account lockout protection.

---

## 📋 Table of Contents
- [Project Objectives](#-project-objectives)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Endpoints](#-api-endpoints)
- [Phase 1 – Submission](#-phase-1--user-authentication--security-foundation)
- [Phase 2 – Submission](#-phase-2--password-management-session-handling--deployment)
- [Setup & Installation](#-setup--installation)
- [Security Features](#-security-features)
- [Database Schema](#-database-schema)

---

## 🎯 Project Objectives

- ✅ Build a secure Authentication & Authorization backend system
- ✅ Implement JWT-based authentication workflows (Access + Refresh tokens)
- ✅ Ensure secure password storage using bcrypt hashing (salt rounds: 12)
- ✅ Develop APIs for Registration, Login, and Password Management
- ✅ Follow industry-standard backend security practices

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | Bcryptjs (rounds: 12) |
| Validation | Express-Validator |
| Security Headers | Helmet.js |
| Rate Limiting | express-rate-limit |
| Email | Nodemailer |
| Logging | Morgan |

---

## 🏗 Architecture

```
src/
├── app.js                    # Entry point, middleware, server
├── controllers/
│   └── auth.controller.js    # All auth business logic
├── middleware/
│   ├── auth.middleware.js    # JWT protect + role restrict
│   ├── error.middleware.js   # Global error handler
│   └── validation.middleware.js  # express-validator rules
├── models/
│   └── user.model.js         # MongoDB/Mongoose schema
├── routes/
│   ├── auth.routes.js        # /api/auth/*
│   └── user.routes.js        # /api/users/*
└── utils/
    ├── jwt.utils.js          # Token generation & verification
    └── email.utils.js        # Nodemailer email helpers
docs/
└── swagger.yaml              # OpenAPI 3.0 documentation
postman/
└── AuthSystem.postman_collection.json
```

---

## 🔗 API Endpoints

### Phase 1 — Authentication & JWT

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Login, get JWT pair |
| `GET` | `/api/auth/me` | 🔒 Private | Get current user |
| `POST` | `/api/auth/refresh-token` | Public | Rotate token pair |
| `POST` | `/api/auth/logout` | 🔒 Private | Invalidate refresh token |
| `POST` | `/api/auth/logout-all` | 🔒 Private | Invalidate all sessions |

### Phase 2 — Password & Session Management

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/forgot-password` | Public | Send reset email |
| `PATCH` | `/api/auth/reset-password/:token` | Public | Reset via email token |
| `PATCH` | `/api/auth/change-password` | 🔒 Private | Change while logged in |
| `GET` | `/api/auth/verify-email/:token` | Public | Verify email address |
| `GET` | `/api/users/profile` | 🔒 Private | Get profile |
| `PATCH` | `/api/users/profile` | 🔒 Private | Update profile |

---

## 📦 Phase 1 — User Authentication & Security Foundation

**Duration:** 360 hours | **Start:** 13 May 2026

### Deliverables
- [x] GitHub repository with backend setup
- [x] Working registration and login APIs
- [x] JWT authentication workflow (Access + Refresh token rotation)
- [x] Postman API collection (`postman/AuthSystem.postman_collection.json`)
- [x] Database schema and API documentation

### JWT Flow Diagram
```
Client                     Server
  │                           │
  │── POST /auth/register ───>│ Hash password (bcrypt)
  │<── 201 + {access, refresh}│ Store refresh in DB
  │                           │
  │── POST /auth/login ──────>│ Compare bcrypt hash
  │<── 200 + {access, refresh}│ Track login attempts
  │                           │
  │── GET /auth/me ──────────>│ Verify access token (15min)
  │   [Authorization: Bearer] │ Check user active + pw not changed
  │<── 200 + user data ───────│
  │                           │
  │── POST /auth/refresh ────>│ Verify refresh token (7d)
  │                           │ Detect reuse → revoke all
  │<── 200 + new pair ────────│ Rotate: old→deleted, new→stored
```

---

## 🔐 Phase 2 — Password Management, Session Handling & Deployment

**Duration:** 360 hours | **Start:** 13 May 2026

### Deliverables
- [x] Live deployed authentication APIs
- [x] Final GitHub repository (this repo)
- [x] Password reset and session management
- [x] Swagger/OpenAPI documentation (`docs/swagger.yaml`)
- [x] Security documentation (see below)

### Password Reset Flow
```
1. POST /auth/forgot-password   → Generate SHA-256 hashed token, store in DB (10 min TTL)
2. Email sent with reset URL    → Contains raw (unhashed) token
3. PATCH /auth/reset-password/:token
   → Hash incoming token → compare with DB
   → Update password (bcrypt)
   → Invalidate ALL refresh tokens
   → Issue new JWT pair
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js >= 18.x
- MongoDB (local or MongoDB Atlas)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/secure-auth-system.git
cd secure-auth-system

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secrets, email credentials

# 4. Start development server
npm run dev

# 5. Server starts on http://localhost:5000
# Health check: GET http://localhost:5000/health
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/auth_system` |
| `JWT_SECRET` | Access token secret (min 32 chars) | `your_super_secret_key` |
| `JWT_EXPIRES_IN` | Access token TTL | `15m` |
| `JWT_REFRESH_SECRET` | Refresh token secret | `your_refresh_secret` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL | `7d` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_USER` | SMTP username | `your@gmail.com` |
| `EMAIL_PASS` | SMTP app password | `xxxx xxxx xxxx xxxx` |
| `CLIENT_URL` | Frontend URL (for email links) | `http://localhost:3000` |

---

## 🛡 Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcryptjs, salt rounds = 12 |
| Token Strategy | Short-lived access (15min) + Refresh rotation |
| Token Reuse Detection | Clears all sessions if stale refresh token used |
| Account Lockout | 5 failed attempts → 30min lock |
| Rate Limiting | Global: 100/15min; Auth routes: 10/15min |
| Security Headers | Helmet.js (XSS, CSP, HSTS, etc.) |
| Input Validation | express-validator on all inputs |
| CORS | Configured with whitelist |
| Enumeration Prevention | Forgot password always returns 200 |
| Password Change | Invalidates all existing sessions |
| Token in DB | Refresh tokens stored & verified server-side |

---

## 🗄 Database Schema

```javascript
User {
  name:                    String (2-50 chars, required)
  email:                   String (unique, indexed, required)
  password:                String (bcrypt hashed, select: false)
  role:                    Enum['user', 'admin'] (default: 'user')
  isEmailVerified:         Boolean (default: false)
  isActive:                Boolean (default: true)
  refreshTokens:           [{ token, createdAt, expiresAt }]
  passwordResetToken:      String (SHA-256 hashed)
  passwordResetExpires:    Date (10 min TTL)
  emailVerificationToken:  String (SHA-256 hashed)
  emailVerificationExpires:Date (24 hr TTL)
  lastLogin:               Date
  loginAttempts:           Number
  lockUntil:               Date
  passwordChangedAt:       Date
  createdAt:               Date (auto)
  updatedAt:               Date (auto)
}
```

---

## 📄 License

MIT © Gudala Venkata Satyanarayana
