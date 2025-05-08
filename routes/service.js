const {Service} = require('../models/service');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');


// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const serviceList = await Service.find();

    if(!serviceList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(serviceList);
})



router.get(`/:id`, async (req, res) =>{
    const serviceList = await Service.findById(req.params.id);

    if(!serviceList) {
        res.status(500).json({success: false})
    } 
    res.send(serviceList);
})
router.post('/', async (req,res)=>{
    let service = new Service({
        useremail: req.body.useremail,
        name: req.body.name,
        vehicle: req.body.vehicle,
        manpower_details: req.body.manpower_details,
        address: req.body.address,
        mobile: req.body.mobile
    })
    
    service = await service.save();

    if(!service)
    return res.status(400).send('the service cannot be created!')
    res.send(service);
    
})



router.delete('/:id',  (req, res)=>{
    Service.findByIdAndRemove(req.params.id).then(service =>{
        if(service) {
            return res.status(200).json({success: true, message: 'the service is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "service not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id',async (req, res)=> {
    const service = await Service.findByIdAndUpdate(
        req.params.id,
        {        
            
        useremail: req.body.useremail,
        name: req.body.name,
        vehicle: req.body.vehicle,
        manpower_details: req.body.manpower_details,
        address: req.body.address,
        mobile: req.body.mobile
        },
        { new: true}
    )

    if(!service)
    return res.status(400).send('the service cannot be created!')

    res.send(service);
})




router.put('/map/:id',async (req, res)=> {
    const service = await Service.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!service)
    return res.status(400).send('the service cannot be created!')

    res.send(service);
})






module.exports =router;