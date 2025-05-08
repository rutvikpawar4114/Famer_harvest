const mongoose = require('mongoose');

const cropSchema = mongoose.Schema({
    useremail: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,    
    },
    quantity: {
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
    image: {
        type: String,
        default: ''
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


cropSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cropSchema.set('toJSON', {
    virtuals: true,
});


exports.Crop = mongoose.model('Crop', cropSchema);
