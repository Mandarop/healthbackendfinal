const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const { name, age, contact, email, gender, address, medicalHistory, currentMedications } = req.body;

        // Check if the patient already exists
        const patientExists = await Patient.findOne({ email });

        if (patientExists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        // Create a new patient
        const patient = new Patient({
            name,
            age,
            contact,
            email,
            gender,
            address,
            medicalHistory,
            currentMedications,
        });

        await patient.save();
        res.status(201).json({ message: 'Patient created successfully', patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json({ patients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json({ patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update patient information
exports.updatePatient = async (req, res) => {
    try {
        const { name, age, contact, email, gender, address, medicalHistory, currentMedications } = req.body;

        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.name = name || patient.name;
        patient.age = age || patient.age;
        patient.contact = contact || patient.contact;
        patient.email = email || patient.email;
        patient.gender = gender || patient.gender;
        patient.address = address || patient.address;
        patient.medicalHistory = medicalHistory || patient.medicalHistory;
        patient.currentMedications = currentMedications || patient.currentMedications;

        await patient.save();

        res.json({ message: 'Patient updated successfully', patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        await patient.remove();
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
