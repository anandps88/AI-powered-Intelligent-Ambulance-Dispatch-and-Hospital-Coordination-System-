const express = require('express');
const router = express.Router();
require('dotenv').config();

// Dummy user credentials (in production, this would be in a database)
const VALID_USERS = [
  {
    email: 'admin@emergency.ai',
    password: '123456',
    role: 'admin',
    name: 'Admin User'
  },
  {
    email: 'anand',
    password: '123456',
    role: 'admin',
    name: 'Anand'
  },
  {
    email: 'dispatcher@emergency.ai',
    password: '123456',
    role: 'dispatcher',
    name: 'Dispatcher'
  }
];

/**
 * POST /api/auth/login
 * Authenticate user and return token
 */
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`[AUTH] Login attempt for: ${email}`);

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = VALID_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      console.log(`[AUTH] Failed login attempt for: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // In production, generate a proper JWT token
    const token = process.env.AUTH_TOKEN;

    console.log(`[AUTH] Successful login for: ${email}`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token: token,
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('[AUTH] Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (in production, would invalidate token)
 */
router.post('/logout', (req, res) => {
  console.log('[AUTH] User logged out');
  return res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * GET /api/auth/verify
 * Verify if token is valid
 */
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (token === process.env.AUTH_TOKEN) {
    return res.status(200).json({
      success: true,
      message: 'Token is valid'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid token'
  });
});

module.exports = router;
