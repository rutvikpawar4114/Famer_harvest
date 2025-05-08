const mongoose = require('mongoose');

// vendoremail  useremail  complaint mobile lat long status
const croprequestSchema = mongoose.Schema({
   
    useremail: {
        type: String,
        required: true,    
    },
    buyeremail: {
        type: String,
        required: true,    
    },
    cropname: {
        type: String,
        required: true,    
    },  
    name: {
        type: String,
        required: true,    
    },
    bidding_details: {
        type: String,
        required: true,    
    },
   
    mobile: {
        type: Number,
        required: true,    
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    report: {
        type: String,
          default: ''
    },
    receipt: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Pending',   
    },
    dateCreated: {
        type: String, // Store as string to prevent automatic conversion to local time in MongoDB
        default: new Date().toISOString(),
    }
})


croprequestSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

croprequestSchema.set('toJSON', {
    virtuals: true,
});


exports.Croprequest = mongoose.model('Croprequest', croprequestSchema);
