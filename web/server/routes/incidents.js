const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * GET /api/incidents
 * Get all incidents
 */
router.get('/', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/incidents.json');
    const incidents = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`[INCIDENTS] Retrieved ${incidents.length} incidents`);

    return res.status(200).json({
      success: true,
      message: 'Incidents retrieved successfully',
      data: incidents,
      count: incidents.length
    });

  } catch (error) {
    console.error('[INCIDENTS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve incidents',
      error: error.message
    });
  }
});

/**
 * GET /api/incidents/:id
 * Get specific incident by ID
 */
router.get('/:id', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/incidents.json');
    const incidents = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const incident = incidents.find(i => i.id === parseInt(req.params.id));

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }

    console.log(`[INCIDENTS] Retrieved incident ${req.params.id}`);

    return res.status(200).json({
      success: true,
      data: incident
    });

  } catch (error) {
    console.error('[INCIDENTS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve incident',
      error: error.message
    });
  }
});

/**
 * POST /api/incidents
 * Create new incident
 */
router.post('/', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/incidents.json');
    const incidents = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const newIncident = {
      id: incidents.length + 101,
      caseId: `EMG-2025-${incidents.length + 101}`,
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };

    incidents.push(newIncident);
    fs.writeFileSync(dataPath, JSON.stringify(incidents, null, 2));

    console.log(`[INCIDENTS] Created new incident ${newIncident.id}`);

    return res.status(201).json({
      success: true,
      message: 'Incident created successfully',
      data: newIncident
    });

  } catch (error) {
    console.error('[INCIDENTS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create incident',
      error: error.message
    });
  }
});

/**
 * PATCH /api/incidents/:id
 * Update incident status
 */
router.patch('/:id', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/incidents.json');
    const incidents = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const index = incidents.findIndex(i => i.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }

    incidents[index] = {
      ...incidents[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(dataPath, JSON.stringify(incidents, null, 2));

    console.log(`[INCIDENTS] Updated incident ${req.params.id}`);

    return res.status(200).json({
      success: true,
      message: 'Incident updated successfully',
      data: incidents[index]
    });

  } catch (error) {
    console.error('[INCIDENTS] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update incident',
      error: error.message
    });
  }
});

module.exports = router;
