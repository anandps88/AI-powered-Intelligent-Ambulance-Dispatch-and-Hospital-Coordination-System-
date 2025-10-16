# Frontend-Backend Integration Guide

## 🎉 Integration Complete!

The frontend Next.js application is now fully integrated with the Express.js backend API.

---

## What Changed

### 1. **New API Service Layer** (`lib/api.js`)
A centralized API service layer that handles all backend communication:
- Authentication API (login, logout, verify)
- Dashboard API (stats, real-time data)
- Incidents API (full CRUD operations)
- Hospitals API (full CRUD operations)
- Automatic token injection in headers
- Error handling

### 2. **Updated Authentication** (`context/AuthContext.jsx`)
- Now calls `POST /api/auth/login` instead of local validation
- Stores JWT token in localStorage
- Token automatically included in all protected API requests
- Proper error handling for network failures

**Login Credentials (Backend):**
```
Email: admin@emergency.ai
Password: 123456

OR

Email: anand
Password: 123456

OR

Email: dispatcher@emergency.ai
Password: 123456
```

### 3. **Updated Login Page** (`app/auth/login/page.jsx`)
- Async login function to wait for API response
- Better error handling and display
- Loading states during authentication

### 4. **Updated Live Stats Card** (`components/LiveStatsCard.jsx`)
- Fetches real-time stats from `GET /api/dashboard`
- Auto-refreshes every 30 seconds
- Loading and error states
- Displays: Active Ambulances, Pending Incidents, Available Hospitals, Avg Response Time

### 5. **Updated Incident Table** (`components/IncidentTable.jsx`)
- Fetches incidents from `GET /api/incidents`
- Auto-refreshes every 15 seconds
- Loading and error states
- Displays all incident fields from backend (caseId, type, severity, status, location, ambulance, ETA)

---

## How to Run

### Step 1: Start Backend Server
```powershell
# Open terminal 1
cd server
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
node index.js
```

Expected output:
```
🚑 ================================================
   AI-Powered Ambulance Dispatch & Hospital
   Coordination System - Backend API
================================================

✅ Server running on: http://localhost:5000
🌍 Environment: development
🔐 Auth Token: demo-token-123
🔓 CORS enabled for: http://localhost:3000
```

### Step 2: Start Frontend Server
```powershell
# Open terminal 2
npm run dev
```

Expected output:
```
▲ Next.js 15.5.5
- Local:        http://localhost:3000
```

### Step 3: Access Application
1. Open browser: `http://localhost:3000`
2. You'll be redirected to `/auth/login`
3. Login with credentials above
4. Dashboard will load with real-time data from API

---

## Data Flow

### Authentication Flow
```
1. User enters email/password → Login Page
2. POST /api/auth/login → Backend validates credentials
3. Backend returns { token, user } → Frontend
4. Frontend stores token in localStorage
5. All subsequent API calls include: Authorization: Bearer <token>
```

### Dashboard Data Flow
```
1. Dashboard page loads → LiveStatsCard component
2. GET /api/dashboard with token → Backend
3. Backend reads dashboard.json → Returns stats
4. Frontend displays data → Auto-refresh every 30s
```

### Incidents Data Flow
```
1. Dashboard page loads → IncidentTable component
2. GET /api/incidents with token → Backend
3. Backend reads incidents.json → Returns array
4. Frontend displays table → Auto-refresh every 15s
```

---

## API Endpoints Used

### Authentication
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token validity

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics
- `GET /api/dashboard/stats` - Get real-time stats (randomized)

### Incidents
- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get specific incident
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents/:id` - Update incident

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/available` - Get available hospitals only
- `GET /api/hospitals/:id` - Get specific hospital
- `PATCH /api/hospitals/:id` - Update hospital

---

## Token Storage

**Frontend stores two items in localStorage:**
1. `authToken` - JWT token for API authentication (demo-token-123)
2. `authUser` - User object with { email, name, role }

**Token is automatically included in all API requests:**
```javascript
headers: {
  'Authorization': 'Bearer demo-token-123'
}
```

---

## Auto-Refresh Intervals

- **LiveStatsCard**: Refreshes every 30 seconds
- **IncidentTable**: Refreshes every 15 seconds
- **AIAlertsCard**: Still using mock data (not yet integrated)
- **MapPanel**: Still using mock data (not yet integrated)

---

## Error Handling

All components now include proper error handling:

1. **Loading State**: Spinner displayed while fetching data
2. **Error State**: Error message displayed if API call fails
3. **Network Errors**: Caught and displayed to user
4. **Auth Errors**: 401 responses handled gracefully

---

## Testing the Integration

### 1. Test Login
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body (@{email="admin@emergency.ai"; password="123456"} | ConvertTo-Json) -ContentType "application/json"
```

### 2. Test Dashboard (with token)
```powershell
$headers = @{ Authorization = "Bearer demo-token-123" }
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard" -Method Get -Headers $headers
```

### 3. Test Incidents (with token)
```powershell
$headers = @{ Authorization = "Bearer demo-token-123" }
Invoke-RestMethod -Uri "http://localhost:5000/api/incidents" -Method Get -Headers $headers
```

---

## Next Steps (Optional Enhancements)

### Not Yet Integrated:
- [ ] AIAlertsCard - Still using mock data from `lib/data.js`
- [ ] MapPanel - Still using mock data from `lib/data.js`
- [ ] QuickActions - Buttons not connected to API endpoints

### Future Enhancements:
- [ ] Create alert API endpoints
- [ ] Create map markers API endpoints
- [ ] Connect QuickActions buttons to dispatch incidents
- [ ] Add WebSocket for real-time updates (instead of polling)
- [ ] Add user management endpoints
- [ ] Add hospital assignment logic

---

## Troubleshooting

### Issue: Login fails with "Unable to connect to server"
**Solution**: Make sure backend server is running on port 5000

### Issue: Dashboard shows "Unable to connect to server"
**Solution**: 
1. Check backend is running
2. Check token is stored in localStorage
3. Open browser DevTools → Application → Local Storage

### Issue: "CORS error"
**Solution**: Backend is configured for `http://localhost:3000`. If you change port, update `server/index.js` CORS config.

### Issue: Data not updating
**Solution**: Check browser DevTools → Network tab to see if API calls are being made every 15-30 seconds

---

## File Changes Summary

### New Files:
- `lib/api.js` - API service layer (175 lines)

### Modified Files:
- `context/AuthContext.jsx` - Backend authentication integration
- `app/auth/login/page.jsx` - Async login handling
- `components/LiveStatsCard.jsx` - API data fetching with auto-refresh
- `components/IncidentTable.jsx` - API data fetching with auto-refresh

### Unchanged Files (Still using mock data):
- `components/AIAlertsCard.jsx`
- `components/MapPanel.jsx`
- `components/QuickActions.jsx`
- `components/Sidebar.jsx`
- `components/TopHeader.jsx`

---

## Success Indicators

✅ **Integration is working if you see:**
1. Login page accepts `admin@emergency.ai` / `123456`
2. Dashboard loads without errors
3. Live stats show real numbers from backend
4. Incident table shows 5-6 incidents from backend
5. Browser DevTools → Network shows API calls to `localhost:5000`
6. Data refreshes automatically every 15-30 seconds

---

## API Base URL Configuration

The API base URL can be configured via environment variable:

**Create `.env.local` file:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Default** (if not set): `http://localhost:5000`

---

**🎊 Frontend-Backend Integration Complete!**
The application is now a full-stack system with real API communication.
