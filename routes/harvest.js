const {Harvest} = require('../models/harvest');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

router.get(`/`,  async (req, res) =>{
    const harvestList = await Harvest.find();

    if(!harvestList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(harvestList);
})



router.get(`/:id`, async (req, res) =>{
    const harvestList = await Harvest.findById(req.params.id);

    if(!harvestList) {
        res.status(500).json({success: false})
    } 
    res.send(harvestList);
})

router.post('/', async (req,res)=>{
    
    let harvest = new Harvest({
        useremail: req.body.useremail,
        vehicle: req.body.vehicle,
        manpower: req.body.manpower,
        crop_details: req.body.crop_details,
        no_of_acre: req.body.no_of_acre,
        duration_date: req.body.duration_date,
        address: req.body.address,
        mobile: req.body.mobile,
        
    })
    
    harvest = await harvest.save();

    if(!harvest)
    return res.status(400).send('the harvest cannot be created!')
    res.send(harvest);
    
})



router.delete('/:id', (req, res)=>{
    Harvest.findByIdAndRemove(req.params.id).then(harvest =>{
        if(harvest) {
            return res.status(200).json({success: true, message: 'the harvest is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "harvest not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id',async (req, res)=> {
    const harvest = await Harvest.findByIdAndUpdate(
        req.params.id,
        {        
            useremail: req.body.useremail,
            vehicle: req.body.vehicle,
            manpower: req.body.manpower,
            crop_details: req.body.crop_details,
            no_of_acre: req.body.no_of_acre,
            duration_date: req.body.duration_date,
            address: req.body.address,
            mobile: req.body.mobile
        },
        { new: true}
    )

    if(!harvest)
    return res.status(400).send('the harvest cannot be created!')

    res.send(harvest);
})




router.put('/map/:id',async (req, res)=> {
    const harvest = await Harvest.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!harvest)
    return res.status(400).send('the harvest cannot be created!')

    res.send(harvest);
})




router.put('/status/:id', auth, async (req, res)=> {
    const harvest = await Harvest.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!harvest)
    return res.status(400).send('the harvest cannot be created!')

    res.send(harvest);
})


module.exports =router;