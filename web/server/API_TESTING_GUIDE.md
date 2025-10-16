# 🧪 Backend API Testing Guide

## Quick Summary

✅ **Backend Server Status:** RUNNING  
✅ **Server URL:** http://localhost:5000  
✅ **Frontend URL:** http://localhost:3000  
✅ **Auth Token:** demo-token-123

---

## 🚀 Quick Test Commands

### 1. Health Check (No Auth Required)
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "AI-Powered Ambulance Dispatch API is running",
  "timestamp": "2025-10-16T10:30:00.000Z",
  "environment": "development"
}
```

---

### 2. Login Test (No Auth Required)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@emergency.ai\",\"password\":\"123456\"}"
```

**Expected Response:**
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

---

### 3. Dashboard Stats (Requires Auth)
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer demo-token-123"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "activeAmbulances": 14,
    "pendingIncidents": 3,
    "availableHospitals": 6,
    "avgResponseTime": "7m 22s"
  }
}
```

---

### 4. Get Incidents (Requires Auth)
```bash
curl -X GET http://localhost:5000/api/incidents \
  -H "Authorization: Bearer demo-token-123"
```

**Expected Response:**
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

---

### 5. Get Hospitals (Requires Auth)
```bash
curl -X GET http://localhost:5000/api/hospitals \
  -H "Authorization: Bearer demo-token-123"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Hospitals retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "City Medical Center",
      "icuBeds": 3,
      "ventilators": 2,
      "status": "Available"
    }
  ],
  "count": 6
}
```

---

## 🔑 Valid Credentials

### Option 1:
```
Email: admin@emergency.ai
Password: 123456
```

### Option 2:
```
Email: anand
Password: 123456
```

### Option 3:
```
Email: dispatcher@emergency.ai
Password: 123456
```

---

## 🌐 Testing in Browser

### Health Check:
Open in browser: http://localhost:5000/health

### API Info:
Open in browser: http://localhost:5000

---

## 🧪 Testing with Postman

### 1. Import Collection

Create a new Postman collection with these requests:

#### Request 1: Health Check
- **Method:** GET
- **URL:** `http://localhost:5000/health`
- **Headers:** None needed

#### Request 2: Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "admin@emergency.ai",
  "password": "123456"
}
```

#### Request 3: Dashboard
- **Method:** GET
- **URL:** `http://localhost:5000/api/dashboard`
- **Headers:**
  - `Authorization: Bearer demo-token-123`

#### Request 4: Incidents
- **Method:** GET
- **URL:** `http://localhost:5000/api/incidents`
- **Headers:**
  - `Authorization: Bearer demo-token-123`

#### Request 5: Hospitals
- **Method:** GET
- **URL:** `http://localhost:5000/api/hospitals`
- **Headers:**
  - `Authorization: Bearer demo-token-123`

---

## ⚡ PowerShell Testing Commands

### Health Check:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
```

### Login:
```powershell
$body = @{
    email = "admin@emergency.ai"
    password = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

### Dashboard:
```powershell
$headers = @{
    Authorization = "Bearer demo-token-123"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard" -Method Get -Headers $headers
```

### Incidents:
```powershell
$headers = @{
    Authorization = "Bearer demo-token-123"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/incidents" -Method Get -Headers $headers
```

### Hospitals:
```powershell
$headers = @{
    Authorization = "Bearer demo-token-123"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/hospitals" -Method Get -Headers $headers
```

---

## 🔍 Server Logs

When you make requests, you'll see logs like:

```
[2025-10-16T10:30:00.000Z] POST /api/auth/login
[AUTH] Login attempt for: admin@emergency.ai
[AUTH] Successful login for: admin@emergency.ai
POST /api/auth/login 200 45ms

[2025-10-16T10:30:15.000Z] GET /api/dashboard
[DASHBOARD] Dashboard data retrieved
GET /api/dashboard 200 12ms

[2025-10-16T10:30:20.000Z] GET /api/incidents
[INCIDENTS] Retrieved 5 incidents
GET /api/incidents 200 8ms
```

---

## ✅ Expected Test Results

### All Tests Passing:
- ✅ Health check returns 200 OK
- ✅ Login returns token
- ✅ Dashboard returns stats
- ✅ Incidents returns array of 5 incidents
- ✅ Hospitals returns array of 6 hospitals
- ✅ Protected routes reject requests without token (401)

### Error Cases to Test:

#### Wrong Credentials:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"wrong@test.com\",\"password\":\"wrong\"}"
```
**Expected:** 401 Unauthorized

#### Missing Auth Token:
```bash
curl -X GET http://localhost:5000/api/dashboard
```
**Expected:** 401 Unauthorized with "No authorization token provided"

#### Invalid Token:
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer invalid-token"
```
**Expected:** 401 Unauthorized with "Invalid or expired token"

---

## 🎯 Integration Testing Checklist

- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails
- [ ] Dashboard requires authentication
- [ ] Incidents endpoint returns data
- [ ] Hospitals endpoint returns data
- [ ] Protected routes reject unauthenticated requests
- [ ] CORS headers allow frontend requests
- [ ] Error responses have proper format

---

## 🚀 Next Steps

1. ✅ Backend server running
2. ⏳ Connect frontend to backend
3. ⏳ Update login page to call API
4. ⏳ Update dashboard to fetch real data
5. ⏳ Test end-to-end flow

---

## 📝 Server Control

### Start Server:
```powershell
cd server
npm start
```

### Stop Server:
Press `Ctrl + C` in the terminal

### Restart Server:
```powershell
# Stop with Ctrl+C, then
npm start
```

---

**Backend API is ready for frontend integration!** 🎉
