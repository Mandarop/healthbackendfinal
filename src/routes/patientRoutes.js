const express = require('express');
const { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const router = express.Router();

// POST /api/patients - Create a new patient
router.post('/', createPatient);

// GET /api/patients - Get all patients
router.get('/', getAllPatients);

// GET /api/patients/:id - Get a specific patient by ID
router.get('/:id', getPatientById);

// PUT /api/patients/:id - Update patient information
router.put('/:id', updatePatient);

// DELETE /api/patients/:id - Delete a patient
router.delete('/:id', deletePatient);

module.exports = router;
