
const mongoose = require('mongoose');

const harvestSchema = mongoose.Schema({
    useremail: {
        type: String,
        required: true,    
    },
    vehicle: {
        type: String,
        required: true,    
    },
    manpower: {
        type: String,
        required: true,    
    },
    crop_details: {
        type: String,
        required: true,    
       
    },
    no_of_acre: {
        type: String,
        required: true,    
    },
    duration_date : {
        type: String,
        required: true,    
    },
   
    address: {
        type: String,
        required: true,    
    },
  
    mobile: {
        type: Number,
        
     
    },
  
    lat: {
        type: Number,  
        default: 0,         
    },
    long: {
        type: Number,
        default: 0,   
    },
    status: {
        type: String,
        default: 'Pending',   
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


harvestSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

harvestSchema.set('toJSON', {
    virtuals: true,
});


exports.Harvest = mongoose.model('Harvest', harvestSchema);
