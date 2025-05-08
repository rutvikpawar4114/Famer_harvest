const {Request} = require('../models/request');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// vendoremail  useremail  complaint mobile lat long status

  


// name description mechanicname service available  locality address city mobile 

// vendoremail  useremail  complaint mobile lat long status

router.get(`/`,  async (req, res) =>{
    const requestList = await Request.find();

    if(!requestList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(requestList);
})


    
router.get(`/:id`, async (req, res) =>{
    const requestList = await Request.findById(req.params.id);
    if(!requestList) {
        res.status(500).json({success: false})
    } 
    res.send(requestList);
})


router.post('/',   async (req,res)=>{
    let request = new Request({
        useremail: req.body.useremail,
       serviceemail: req.body.serviceemail,
       vehicle:req.body.vehicle,
        name: req.body.name,
        mobile: req.body.mobile,
        lat: req.body.lat,
        long: req.body.long,
      
    })
    request = await request.save();

    if(!request)
    return res.status(400).send('the request cannot be created!')
    res.send(request);
    
})




router.put('/:id',async (req, res)=> {
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!request)
    return res.status(400).send('the request cannot be created!')

    res.send(request);
})



router.put('/map/:id',async (req, res)=> {
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )
    if(!request)
    return res.status(400).send('the business cannot be created!')

    res.send(request);
})


router.put('/status/:id',  async (req, res)=> {
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!request)
    return res.status(400).send('the request cannot be created!')

    res.send(request);
})



module.exports =router;