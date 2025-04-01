const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    qualifications: { type: String, required: true },
    experience: { type: Number, required: true },
    address: { type: String, required: true },
});

module.exports = mongoose.model('Doctor', doctorSchema);
