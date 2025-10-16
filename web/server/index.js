const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const incidentsRoutes = require('./routes/incidents');
const hospitalsRoutes = require('./routes/hospitals');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====

// CORS configuration - Allow requests from frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan('dev'));

// Request timestamp logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ===== ROUTES =====

// Health check endpoint (public)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI-Powered Ambulance Dispatch API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Welcome endpoint (public)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to AI-Powered Ambulance Dispatch API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      incidents: '/api/incidents',
      hospitals: '/api/hospitals'
    },
    documentation: 'See README.md for API documentation'
  });
});

// Auth routes (public - no auth required)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/incidents', authMiddleware, incidentsRoutes);
app.use('/api/hospitals', authMiddleware, hospitalsRoutes);

// ===== ERROR HANDLING =====

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(60));
  console.log('🚑  AI-POWERED AMBULANCE DISPATCH API SERVER');
  console.log('='.repeat(60));
  console.log(`✅  Server running on: http://localhost:${PORT}`);
  console.log(`🌍  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑  Auth Token: ${process.env.AUTH_TOKEN}`);
  console.log('');
  console.log('📌  Available Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/api/dashboard`);
  console.log(`   GET  http://localhost:${PORT}/api/incidents`);
  console.log(`   GET  http://localhost:${PORT}/api/hospitals`);
  console.log('');
  console.log('🔐  Protected routes require: Authorization: Bearer demo-token-123');
  console.log('='.repeat(60));
  console.log('');
});

module.exports = app;
