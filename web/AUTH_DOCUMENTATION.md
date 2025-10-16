# 🔐 Authentication System Documentation

## Overview
A complete authentication system has been added to the AI-Powered Ambulance Dispatch Dashboard with login/logout functionality, route protection, and session management.

---

## ✅ Features Implemented

### 1. **Login Page** (`/auth/login`)
- ✅ Modern, centered login form with gradient background
- ✅ Email/username and password fields with icons
- ✅ Inline error messages for invalid credentials
- ✅ Loading state with spinner during authentication
- ✅ Smooth Framer Motion animations
- ✅ Demo credentials display for easy testing
- ✅ Auto-redirect if already logged in

### 2. **Authentication Context** (`/context/AuthContext.jsx`)
- ✅ Centralized auth state management
- ✅ User session stored in localStorage
- ✅ Login/logout functions
- ✅ Auto-login on page refresh (persistent sessions)
- ✅ Loading state management

### 3. **Route Protection** (`/components/AuthGuard.jsx`)
- ✅ Protects dashboard routes from unauthorized access
- ✅ Auto-redirects to login if not authenticated
- ✅ Shows loading spinner while checking auth status
- ✅ Prevents flash of protected content

### 4. **Logout Functionality**
- ✅ Logout button in sidebar
- ✅ Clears localStorage on logout
- ✅ Redirects to login page
- ✅ Styled in red with hover effects

### 5. **User Profile Display**
- ✅ User avatar with initials in sidebar
- ✅ User name and role display
- ✅ Visible on all protected pages

---

## 🎨 Design Features

### Login Page Design
- **Background:** Dark gradient with animated blur elements
- **Card:** Rounded corners, subtle border, shadow
- **Colors:** Matches dashboard theme (slate-900, blue accents)
- **Animations:** 
  - Logo scale animation
  - Form field slide-in
  - Error message slide-in
  - Button hover effects

### Sidebar Updates
- **User Section:** Profile picture with name and role
- **Logout Button:** Red accent color with hover effect
- **Responsive:** Maintains existing dark theme

---

## 🔑 Demo Credentials

```
Username: anand
Password: 123456
```

---

## 📁 File Structure

```
web/
├── app/
│   ├── auth/
│   │   └── login/
│   │       └── page.jsx          ← Login page
│   ├── dashboard/
│   │   └── page.jsx               ← Protected dashboard (moved from root)
│   ├── layout.jsx                 ← Updated with AuthProvider
│   └── page.jsx                   ← Redirect logic
├── components/
│   ├── AuthGuard.jsx              ← NEW: Route protection
│   └── Sidebar.jsx                ← Updated: Added logout + user info
└── context/
    └── AuthContext.jsx            ← NEW: Auth state management
```

---

## 🔄 Authentication Flow

### Login Flow
```
1. User visits http://localhost:3000
   ↓
2. Check localStorage for 'authUser'
   ↓
3a. If found → Redirect to /dashboard
3b. If not found → Redirect to /auth/login
   ↓
4. User enters credentials
   ↓
5. Validate (username: 'anand', password: '123456')
   ↓
6a. Valid → Store in localStorage → Redirect to /dashboard
6b. Invalid → Show error message
```

### Dashboard Access Flow
```
1. User visits /dashboard
   ↓
2. AuthGuard checks authentication
   ↓
3a. Authenticated → Show dashboard
3b. Not authenticated → Redirect to /auth/login
```

### Logout Flow
```
1. User clicks Logout button
   ↓
2. Clear localStorage ('authUser')
   ↓
3. Clear auth context state
   ↓
4. Redirect to /auth/login
```

---

## 💻 Code Examples

### How Authentication Works

#### 1. Login Function (AuthContext.jsx)
```javascript
const login = (email, password) => {
  if (email === 'anand' && password === '123456') {
    const userData = {
      email: email,
      name: 'Anand',
      role: 'Admin',
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('authUser', JSON.stringify(userData))
    setUser(userData)
    return { success: true }
  }
  return { success: false, error: 'Invalid credentials' }
}
```

#### 2. Logout Function (AuthContext.jsx)
```javascript
const logout = () => {
  localStorage.removeItem('authUser')
  setUser(null)
  router.push('/auth/login')
}
```

#### 3. Protected Route Example
```javascript
import AuthGuard from '@/components/AuthGuard'

export default function DashboardPage() {
  return (
    <AuthGuard>
      {/* Your protected content */}
    </AuthGuard>
  )
}
```

#### 4. Using Auth in Components
```javascript
import { useAuth } from '@/context/AuthContext'

function MyComponent() {
  const { user, logout } = useAuth()
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

## 🧪 Testing the Authentication

### Test Case 1: Successful Login
1. Navigate to http://localhost:3000
2. Should auto-redirect to /auth/login
3. Enter username: `anand`
4. Enter password: `123456`
5. Click "Login"
6. Should show loading spinner
7. Should redirect to /dashboard
8. Dashboard should load with user info in sidebar

### Test Case 2: Invalid Login
1. Go to /auth/login
2. Enter wrong username or password
3. Click "Login"
4. Should show red error message: "Invalid credentials"
5. Should NOT redirect

### Test Case 3: Persistent Session
1. Login successfully
2. Refresh the page (F5)
3. Should remain logged in
4. Should NOT redirect to login

### Test Case 4: Logout
1. While logged in, click "Logout" in sidebar
2. Should clear session
3. Should redirect to /auth/login
4. Trying to access /dashboard should redirect back to login

### Test Case 5: Direct Access Protection
1. Logout completely
2. Try to access /dashboard directly in URL
3. Should immediately redirect to /auth/login

---

## 🔒 Security Notes

### Current Implementation (Demo)
- ✅ Client-side authentication (localStorage)
- ✅ Route protection
- ✅ Session persistence
- ⚠️ Credentials are hardcoded (demo only)
- ⚠️ No encryption (localStorage is plain text)
- ⚠️ No backend validation

### For Production Use
To make this production-ready, you would need to:

1. **Backend API Integration**
   ```javascript
   const login = async (email, password) => {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     })
     const data = await response.json()
     if (data.token) {
       localStorage.setItem('authToken', data.token)
       return { success: true, user: data.user }
     }
     return { success: false, error: data.message }
   }
   ```

2. **JWT Tokens**
   - Store JWT token instead of user object
   - Include token in API request headers
   - Implement token refresh logic

3. **HTTP-Only Cookies**
   - Store tokens in HTTP-only cookies (more secure)
   - Prevent XSS attacks

4. **Password Hashing**
   - Never store plain text passwords
   - Use bcrypt or similar

5. **Session Timeout**
   - Implement auto-logout after inactivity
   - Token expiration

6. **HTTPS Only**
   - Always use HTTPS in production
   - Secure cookie flags

---

## 🎯 Customization Guide

### Change Demo Credentials
Edit `context/AuthContext.jsx`:
```javascript
if (email === 'your-username' && password === 'your-password') {
  // ...
}
```

### Add More User Fields
Update the userData object:
```javascript
const userData = {
  email: email,
  name: 'Your Name',
  role: 'Admin',
  avatar: '/path/to/avatar.png',
  department: 'Emergency Services',
  loginTime: new Date().toISOString()
}
```

### Change Redirect Routes
Update in `AuthContext.jsx`:
```javascript
// After login
router.push('/your-custom-route')

// After logout
router.push('/your-login-page')
```

### Customize Login Page
Edit `app/auth/login/page.jsx`:
- Change colors (blue → your color)
- Modify background gradients
- Add/remove form fields
- Change animations

---

## 🐛 Troubleshooting

### Issue: "Can't resolve '@/context/AuthContext'"
**Solution:** Make sure `jsconfig.json` exists with proper path alias:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Login doesn't work
**Solution:** Check browser console for errors. Verify:
1. Username is exactly: `anand`
2. Password is exactly: `123456`
3. No extra spaces

### Issue: Redirects not working
**Solution:** Clear localStorage and cookies:
```javascript
// In browser console
localStorage.clear()
```

### Issue: User info not showing in sidebar
**Solution:** 
1. Check if user is in context
2. Verify AuthProvider wraps the app
3. Check localStorage has 'authUser'

---

## 📊 State Management

### localStorage Structure
```javascript
{
  "authUser": {
    "email": "anand",
    "name": "Anand",
    "role": "Admin",
    "loginTime": "2025-10-16T10:30:00.000Z"
  }
}
```

### Context State
```javascript
{
  user: {
    email: "anand",
    name: "Anand",
    role: "Admin",
    loginTime: "2025-10-16T10:30:00.000Z"
  },
  loading: false,
  login: function,
  logout: function
}
```

---

## 🚀 Next Steps for Enhancement

### Phase 1 (Completed) ✅
- [x] Login page with form
- [x] Authentication context
- [x] Route protection
- [x] Logout functionality
- [x] User profile in sidebar

### Phase 2 (Future)
- [ ] Backend API integration
- [ ] JWT token authentication
- [ ] Password reset flow
- [ ] Remember me checkbox
- [ ] Session timeout
- [ ] Multi-factor authentication

### Phase 3 (Advanced)
- [ ] Role-based access control
- [ ] User management dashboard
- [ ] Activity logs
- [ ] SSO integration
- [ ] OAuth providers (Google, GitHub)

---

## 📝 Summary

The authentication system is now **fully functional** with:
- ✅ Beautiful login page matching dashboard theme
- ✅ Session persistence across page refreshes
- ✅ Protected routes with auto-redirect
- ✅ Logout functionality
- ✅ User profile display
- ✅ Smooth animations and transitions
- ✅ Error handling

**To test:** Visit http://localhost:3000 and login with `anand` / `123456`

---

*Last Updated: October 16, 2025*
