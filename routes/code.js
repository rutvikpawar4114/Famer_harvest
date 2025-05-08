const {License} = require('../models/code');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');

const fs = require('fs').promises;

//const configPath = path.resolve('../helpers/', 'config.json');
const configPath = path.resolve(__dirname, '..', 'helpers', 'config.json');

router.post('/verifyLicense2', async (req, res) => {
  try {
    const { license, deviceId } = req.body;

    // Read license information from the configuration file
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    // Verify license
    if (storedLicense.licenseCode === license && storedLicense.deviceId === deviceId) {
      // Save the license information to the database or perform any other necessary setup
      // ...

      // Send a success response
      return res.json({ message: 'Valid license' });
    } else {
      return res.status(403).json({ message: 'Invalid license code or device ID pls contact support' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verifyLicense', async (req, res) => {
    try {
  
    
        // Find a license record that matches the provided license code
        const existingLicense = await License.findOne({ licenseCode: req.body.license  });
    
        if (!existingLicense) {
          return res.status(400).json({ message: 'Invalid license code' });
        }
    
        // Check if the deviceId matches the stored deviceId
        if (existingLicense.deviceId !== req.body.deviceId) {
          return res.status(403).json({ message: 'License not valid for this device' });
        }
    
        // If both license and deviceId are valid, send a success response
        return res.json({ message: 'Valid license' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
    

  

module.exports =router;