const mongoose = require('mongoose');

// vendoremail  useremail  complaint mobile lat long status
const requestSchema = mongoose.Schema({
   
    useremail: {
        type: String,
        required: true,    
    },
    serviceemail: {
        type: String,
        required: true,    
    },
    vehicle: {
        type: String,
        required: true,    
    },
    name: {
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
    status: {
        type: String,
        default: 'Pending',   
    },
    dateCreated: {
        type: String, // Store as string to prevent automatic conversion to local time in MongoDB
        default: new Date().toISOString(),
    }
})


requestSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

requestSchema.set('toJSON', {
    virtuals: true,
});


exports.Request = mongoose.model('Request', requestSchema);
