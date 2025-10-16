const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * GET /api/hospitals
 * Get all hospitals with bed availability
 */
router.get('/', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/hospitals.json');
    const hospitals = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`[HOSPITALS] Retrieved ${hospitals.length} hospitals`);

    return res.status(200).json({
      success: true,
      message: 'Hospitals retrieved successfully',
      data: hospitals,
      count: hospitals.length
    });

  } catch (error) {
    console.error('[HOSPITALS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve hospitals',
      error: error.message
    });
  }
});

/**
 * GET /api/hospitals/available
 * Get only hospitals with available beds
 */
router.get('/available', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/hospitals.json');
    const hospitals = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const availableHospitals = hospitals.filter(h => h.status === 'Available');

    console.log(`[HOSPITALS] Retrieved ${availableHospitals.length} available hospitals`);

    return res.status(200).json({
      success: true,
      data: availableHospitals,
      count: availableHospitals.length
    });

  } catch (error) {
    console.error('[HOSPITALS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve available hospitals',
      error: error.message
    });
  }
});

/**
 * GET /api/hospitals/:id
 * Get specific hospital by ID
 */
router.get('/:id', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/hospitals.json');
    const hospitals = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const hospital = hospitals.find(h => h.id === parseInt(req.params.id));

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    console.log(`[HOSPITALS] Retrieved hospital ${req.params.id}`);

    return res.status(200).json({
      success: true,
      data: hospital
    });

  } catch (error) {
    console.error('[HOSPITALS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve hospital',
      error: error.message
    });
  }
});

/**
 * PATCH /api/hospitals/:id
 * Update hospital bed availability
 */
router.patch('/:id', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/hospitals.json');
    const hospitals = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const index = hospitals.findIndex(h => h.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    hospitals[index] = {
      ...hospitals[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(dataPath, JSON.stringify(hospitals, null, 2));

    console.log(`[HOSPITALS] Updated hospital ${req.params.id}`);

    return res.status(200).json({
      success: true,
      message: 'Hospital updated successfully',
      data: hospitals[index]
    });

  } catch (error) {
    console.error('[HOSPITALS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update hospital',
      error: error.message
    });
  }
});

module.exports = router;
