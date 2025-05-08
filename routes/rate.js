const {Rate} = require('../models/rate');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

const multer = require('multer');

// vendoremail  useremail  complaint mobile lat long status


// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const rateList = await Rate.find();

    if(!rateList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(rateList);
})



router.get(`/:id`, async (req, res) =>{
    const rateList = await Rate.findById(req.params.id);

    if(!rateList) {
        res.status(500).json({success: false})
    } 
    res.send(rateList);
})
router.post('/',  async (req,res)=>{
    let rate = new Rate({
        buyeremail: req.body.buyeremail,
        crop_name: req.body.crop_name,
        price: req.body.price,
       address: req.body.address,
        mobile: req.body.mobile
    })
    
    rate = await rate.save();

    if(!rate)
    return res.status(400).send('the rate cannot be created!')
    res.send(rate);
    
})



router.delete('/:id', (req, res)=>{
    Rate.findByIdAndRemove(req.params.id).then(rate =>{
        if(rate) {
            return res.status(200).json({success: true, message: 'the rate is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "rate not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id',async (req, res)=> {
    const rate = await Rate.findByIdAndUpdate(
        req.params.id,
        {        
            buyeremail: req.body.buyeremail,
            crop_name: req.body.crop_name,
            price: req.body.price,
           address: req.body.address,
            mobile: req.body.mobile
        },
        { new: true}
    )

    if(!rate)
    return res.status(400).send('the rate cannot be created!')

    res.send(rate);
})




router.put('/map/:id',async (req, res)=> {
    const rate = await Rate.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!rate)
    return res.status(400).send('the rate cannot be created!')

    res.send(rate);
})



module.exports =router;