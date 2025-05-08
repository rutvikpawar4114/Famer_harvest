const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
    buyeremail: {
        type: String,
        required: true,    
    },
    crop_name: {
        type: String,
        required: true,    
    },
    price: {
        type: Number,
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


rateSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

rateSchema.set('toJSON', {
    virtuals: true,
});


exports.Rate = mongoose.model('Rate', rateSchema);
