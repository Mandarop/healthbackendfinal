const Doctor = require('../models/Doctor');

// Create a new doctor
exports.createDoctor = async (req, res) => {
    try {
        const { name, specialization, contact, email, qualifications, experience, address } = req.body;

        // Check if the doctor already exists
        const doctorExists = await Doctor.findOne({ email });

        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        // Create a new doctor
        const doctor = new Doctor({
            name,
            specialization,
            contact,
            email,
            qualifications,
            experience,
            address,
        });

        await doctor.save();
        res.status(201).json({ message: 'Doctor created successfully', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json({ doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({ doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update doctor information
exports.updateDoctor = async (req, res) => {
    try {
        const { name, specialization, contact, email, qualifications, experience, address } = req.body;

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.contact = contact || doctor.contact;
        doctor.email = email || doctor.email;
        doctor.qualifications = qualifications || doctor.qualifications;
        doctor.experience = experience || doctor.experience;
        doctor.address = address || doctor.address;

        await doctor.save();

        res.json({ message: 'Doctor updated successfully', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await doctor.remove();
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
