const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    useremail: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,    
    },
    vehicle: {
        type: String,
        required: true,    
    },
    manpower_details: {
        type: String,
        required: true,   
    },
    
    address: {
        type: String,
        required: true,    
    },
  
    mobile: {
        type: Number,
        required: true,    
    },
   
    lat: {
        type: Number,  
        default: 0,         
    },
    long: {
        type: Number,
        default: 0,   
    },
    
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


serviceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceSchema.set('toJSON', {
    virtuals: true,
});


exports.Service = mongoose.model('Service', serviceSchema);
