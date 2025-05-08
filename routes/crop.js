const { Crop } = require('../models/crop');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');

// Set up multer storage for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const cropList = await Crop.find();
    res.status(200).send(cropList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found!' });
    }
    res.status(200).send(crop);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');
    
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let crop = new Crop({
      useremail: req.body.useremail,
      name: req.body.name,
      quantity: req.body.quantity,
      address: req.body.address,
      mobile: req.body.mobile,
      image: `${basePath}${fileName}`,
    });

    crop = await crop.save();
    if (!crop) return res.status(400).send('The crop cannot be created!');
    res.status(201).send(crop);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id',async (req, res) => {
  try {
    const crop = await Crop.findByIdAndRemove(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found!' });
    res.status(200).json({ success: true, message: 'The crop is deleted!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      {
        useremail: req.body.useremail,
        name: req.body.name,
        quantity: req.body.quantity,
        address: req.body.address,
        mobile: req.body.mobile,
        // Handle image update separately if needed
      },
      { new: true }
    );

    if (!crop) return res.status(400).send('The crop cannot be updated!');
    res.status(200).send(crop);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/map/:id', async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      {
        lat: req.body.lat,
        long: req.body.long,
      },
      { new: true }
    );

    if (!crop) return res.status(400).send('The crop location cannot be updated!');
    res.status(200).send(crop);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.put('/upload_image/:id', upload.single('image'), async (req, res) => {
  try {
    const fileName = req.file.filename; // Corrected reference
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const itemId = req.params.id;
    
    const updatedCrop = await Crop.findByIdAndUpdate(
      itemId,
      {
        image: `${basePath}${fileName}`,
      },
      { new: true } // Option to return the updated document
    );

    if (!updatedCrop) return res.status(404).json({ success: false, message: 'Crop not found!' });
    res.status(200).json({ success: true, message: 'Crop image updated successfully', crop: updatedCrop });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
