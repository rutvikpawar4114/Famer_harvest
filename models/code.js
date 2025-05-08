const mongoose = require('mongoose');
// name, email, password, phone, city, question1, question2

const LicenseSchema = mongoose.Schema({
    licenseCode: String,
    deviceId: String,
  });


LicenseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

LicenseSchema.set('toJSON', {
    virtuals: true,
});

exports.License = mongoose.model('License', LicenseSchema);
