# 🚑 AI-Powered Ambulance Dispatch API

## Mock Backend Server for Emergency Dispatch System

This is a **temporary mock API backend** using Express.js with JSON-based data storage. It provides REST API endpoints for the Ambulance Dispatch Dashboard frontend.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: **http://localhost:5000**

---

## 📡 API Endpoints

### **Public Endpoints** (No Auth Required)

#### Health Check
```http
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "AI-Powered Ambulance Dispatch API is running",
  "timestamp": "2025-10-16T10:30:00.000Z"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@emergency.ai",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "demo-token-123",
    "user": {
      "email": "admin@emergency.ai",
      "name": "Admin User",
      "role": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### **Protected Endpoints** (Require Authorization Header)

All protected routes require:
```
Authorization: Bearer demo-token-123
```

#### Get Dashboard Stats
```http
GET /api/dashboard
Authorization: Bearer demo-token-123
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "activeAmbulances": 14,
    "pendingIncidents": 3,
    "availableHospitals": 6,
    "avgResponseTime": "7m 22s",
    "totalEmergencies": 127,
    "resolvedToday": 45,
    "criticalCases": 2,
    "systemStatus": "Operational"
  }
}
```

#### Get All Incidents
```http
GET /api/incidents
Authorization: Bearer demo-token-123
```

**Response:**
```json
{
  "success": true,
  "message": "Incidents retrieved successfully",
  "data": [
    {
      "id": 101,
      "caseId": "EMG-2025-101",
      "type": "Road Accident",
      "severity": "High",
      "location": "MG Road, Kochi",
      "ambulanceAssigned": "KL-07-AZ-4123",
      "status": "En Route",
      "eta": "4 min"
    }
  ],
  "count": 5
}
```

#### Get Specific Incident
```http
GET /api/incidents/:id
Authorization: Bearer demo-token-123
```

#### Create New Incident
```http
POST /api/incidents
Authorization: Bearer demo-token-123
Content-Type: application/json

{
  "type": "Cardiac Emergency",
  "severity": "Critical",
  "location": "Some Location",
  "ambulanceAssigned": "KL-07-XX-1234"
}
```

#### Update Incident
```http
PATCH /api/incidents/:id
Authorization: Bearer demo-token-123
Content-Type: application/json

{
  "status": "Resolved",
  "eta": "On Site"
}
```

#### Get All Hospitals
```http
GET /api/hospitals
Authorization: Bearer demo-token-123
```

**Response:**
```json
{
  "success": true,
  "message": "Hospitals retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "City Medical Center",
      "location": "MG Road, Kochi",
      "icuBeds": 3,
      "ventilators": 2,
      "status": "Available"
    }
  ],
  "count": 6
}
```

#### Get Available Hospitals Only
```http
GET /api/hospitals/available
Authorization: Bearer demo-token-123
```

#### Get Specific Hospital
```http
GET /api/hospitals/:id
Authorization: Bearer demo-token-123
```

#### Update Hospital
```http
PATCH /api/hospitals/:id
Authorization: Bearer demo-token-123
Content-Type: application/json

{
  "icuBeds": 5,
  "status": "Available"
}
```

---

## 🔑 Demo Credentials

### Valid Users:
```
1. Email: admin@emergency.ai
   Password: 123456
   Role: admin

2. Email: anand
   Password: 123456
   Role: admin

3. Email: dispatcher@emergency.ai
   Password: 123456
   Role: dispatcher
```

### Token:
```
demo-token-123
```

---

## 📁 Project Structure

```
server/
├── index.js                  # Main server file
├── package.json              # Dependencies
├── .env                      # Environment variables
│
├── middleware/
│   └── authMiddleware.js     # JWT token verification
│
├── routes/
│   ├── auth.js               # Login/logout routes
│   ├── dashboard.js          # Dashboard stats
│   ├── incidents.js          # Incident CRUD
│   └── hospitals.js          # Hospital CRUD
│
└── data/
    ├── dashboard.json        # Dashboard mock data
    ├── incidents.json        # Incidents mock data
    └── hospitals.json        # Hospitals mock data
```

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@emergency.ai","password":"123456"}'
```

### Get Dashboard (with auth)
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer demo-token-123"
```

### Get Incidents
```bash
curl -X GET http://localhost:5000/api/incidents \
  -H "Authorization: Bearer demo-token-123"
```

### Get Hospitals
```bash
curl -X GET http://localhost:5000/api/hospitals \
  -H "Authorization: Bearer demo-token-123"
```

---

## 🔧 Environment Variables

Create a `.env` file:
```env
PORT=5000
AUTH_TOKEN=demo-token-123
NODE_ENV=development
```

---

## 🚀 Deployment Ready

This backend can be deployed to:
- ✅ Render.com
- ✅ Railway.app
- ✅ Vercel (with Node.js runtime)
- ✅ Heroku
- ✅ AWS / DigitalOcean

### For Deployment:
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy!

---

## ⚠️ Important Notes

### Current Implementation (Mock):
- ✅ JSON file-based storage (no database)
- ✅ Simple token authentication
- ✅ CORS enabled for localhost
- ✅ Request logging
- ⚠️ Data persists only in memory/files
- ⚠️ Not production-ready security

### For Production:
To make this production-ready:

1. **Add Database:**
   ```javascript
   // Replace JSON files with MongoDB
   const mongoose = require('mongoose');
   mongoose.connect(process.env.MONGODB_URI);
   ```

2. **Add JWT Authentication:**
   ```javascript
   const jwt = require('jsonwebtoken');
   const token = jwt.sign({ userId }, SECRET_KEY);
   ```

3. **Add Password Hashing:**
   ```javascript
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

4. **Add Validation:**
   ```javascript
   const { body, validationResult } = require('express-validator');
   ```

5. **Add Rate Limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   ```

6. **Use HTTPS**
7. **Add environment-specific configs**
8. **Implement proper error logging (Winston/Pino)**

---

## 📊 Response Format

All API responses follow this structure:

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev mode only)"
}
```

---

## 🔍 Logging

The server logs all requests with:
- Timestamp
- HTTP method
- Request path
- Response status

Example output:
```
[2025-10-16T10:30:00.000Z] POST /api/auth/login
[AUTH] Login attempt for: admin@emergency.ai
[AUTH] Successful login for: admin@emergency.ai
POST /api/auth/login 200 45ms
```

---

## 🛠️ Development

### Install nodemon for auto-reload:
```bash
npm install --save-dev nodemon
```

### Run in dev mode:
```bash
npm run dev
```

### Add new routes:
1. Create route file in `/routes`
2. Import in `index.js`
3. Add to app: `app.use('/api/your-route', yourRoutes)`

---

## 📝 TODO for Production

- [ ] Replace JSON files with MongoDB
- [ ] Implement proper JWT authentication
- [ ] Add password hashing with bcrypt
- [ ] Add input validation
- [ ] Implement rate limiting
- [ ] Add comprehensive error handling
- [ ] Set up logging (Winston)
- [ ] Add API documentation (Swagger)
- [ ] Implement WebSocket for real-time updates
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Set up CI/CD pipeline

---

## 📚 Dependencies

```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // CORS middleware
  "dotenv": "^16.3.1",       // Environment variables
  "morgan": "^1.10.0",       // HTTP request logger
  "nodemon": "^3.0.1"        // Auto-reload (dev)
}
```

---

## 🎉 Ready to Use!

Your mock backend API is ready! Start the server and test with:
- **cURL** - Command line testing
- **Postman** - GUI testing
- **Frontend** - Connect your Next.js dashboard

---

**Built with Express.js** | **Ready for MongoDB Migration**

*Last Updated: October 16, 2025*
