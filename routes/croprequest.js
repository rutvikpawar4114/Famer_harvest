const {Croprequest} = require('../models/croprequest');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');

// vendoremail  useremail  complaint mobile lat long status

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


// name description mechanicname service available  locality address city mobile 

// vendoremail  useremail  complaint mobile lat long status

router.get(`/`,  async (req, res) =>{
    const croprequestList = await Croprequest.find();

    if(!croprequestList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(croprequestList);
})


    
router.get(`/:id`, async (req, res) =>{
    const croprequestList = await Croprequest.findById(req.params.id);
    if(!croprequestList) {
        res.status(500).json({success: false})
    } 
    res.send(croprequestList);
})


router.post('/', async (req,res)=>{
    
    let croprequest = new Croprequest({
        useremail: req.body.useremail,
        buyeremail:req.body.buyeremail,
        cropname: req.body.cropname,
        name: req.body.name,
        bidding_details: req.body.bidding_details,
        mobile: req.body.mobile,
        lat: req.body.lat,
        long: req.body.long
    })
    croprequest = await croprequest.save();

    if(!croprequest)
    return res.status(400).send('the croprequest cannot be created!')
    res.send(croprequest);
    
})




router.put('/map/:id',async (req, res)=> {
    const croprequest = await Croprequest.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )
    if(!croprequest)
    return res.status(400).send('the business cannot be created!')

    res.send(croprequest);
})

// PUT route to update the status and upload an image for a item
router.put('/upload_receipt/:id',upload.single('receipt'), async (req, res) => {
    
    try {
      const itemId = req.params.id;
      //const { status, reason, remedies, notes } = req.body;
      const receipt = req.file ? req.file.path : undefined;
  
      // Find the item by ID and update its status and image path
      const updatedPostitem = await Croprequest.findByIdAndUpdate(
        itemId,
        { $set: {receipt } },
        { new: true } // To return the updated document
      );
  
      if (!updatedPostitem) {
        return res.status(404).json({ success: false, message: 'item not found' });
      }
  
      res.status(200).json({ success: true, message: 'item  image updated successfully', item: updatedPostitem });
    } catch (error) {
      console.error('Error updating item  image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



  router.put('/status/:id', async (req, res) => {
    try {
        const croprequest = await Croprequest.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
                report: req.body.report,
            },
            { new: true, runValidators: true } // runValidators ensures data validation
        );

        if (!croprequest) {
            return res.status(404).send('Crop request not found');
        }

        res.send(croprequest);
    } catch (error) {
        console.error('Error updating crop request:', error.message);
        res.status(500).send('An error occurred while updating the crop request');
    }
});


module.exports =router;