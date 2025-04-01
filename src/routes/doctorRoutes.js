const express = require('express');
const { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const router = express.Router();

// POST /api/doctors - Create a new doctor
router.post('/', createDoctor); // Ensure `createDoctor` is a function

// GET /api/doctors - Get all doctors
router.get('/', getAllDoctors);

// GET /api/doctors/:id - Get a specific doctor by ID
router.get('/:id', getDoctorById);

// PUT /api/doctors/:id - Update doctor information
router.put('/:id', updateDoctor);

// DELETE /api/doctors/:id - Delete a doctor
router.delete('/:id', deleteDoctor);

module.exports = router;
