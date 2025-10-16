const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * GET /api/dashboard
 * Get dashboard summary statistics
 */
router.get('/', (req, res) => {
  try {
    // Read dashboard data from JSON file
    const dataPath = path.join(__dirname, '../data/dashboard.json');
    const dashboardData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log('[DASHBOARD] Dashboard data retrieved');

    return res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: dashboardData
    });

  } catch (error) {
    console.error('[DASHBOARD] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard data',
      error: error.message
    });
  }
});

/**
 * GET /api/dashboard/stats
 * Get real-time statistics
 */
router.get('/stats', (req, res) => {
  try {
    // Simulate real-time data updates
    const stats = {
      activeAmbulances: Math.floor(Math.random() * 5) + 12, // 12-16
      pendingIncidents: Math.floor(Math.random() * 5) + 1,  // 1-5
      availableHospitals: Math.floor(Math.random() * 3) + 5, // 5-7
      avgResponseTime: `${Math.floor(Math.random() * 3) + 6}m ${Math.floor(Math.random() * 60)}s`,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('[DASHBOARD] Stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats',
      error: error.message
    });
  }
});

module.exports = router;
