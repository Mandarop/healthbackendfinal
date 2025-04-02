const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    qualifications: { type: [String], required: true }, // ✅ Fixed: Array of strings
    experience: { type: Number, required: true },
    address: { type: String, required: true },
});

module.exports = mongoose.model('Doctor', doctorSchema);
