const Doctor = require('../models/Doctor');

// Create a new doctor
exports.createDoctor = async (req, res) => {
    try {
        console.log("✅ Request received:", req.body); // Debugging log

        if (!req.body || Object.keys(req.body).length === 0) {
            console.log("❌ Request body is missing");
            return res.status(400).json({ message: "Request body is missing" });
        }

        const { name, specialization, contact, email, qualifications, experience, address } = req.body;

        if (!name || !email) {
            console.log("❌ Name and Email are required");
            return res.status(400).json({ message: "Name and Email are required" });
        }

        // Check if the doctor already exists
        const doctorExists = await Doctor.findOne({ email });

        if (doctorExists) {
            console.log("❌ Doctor already exists with email:", email);
            return res.status(400).json({ message: "Doctor already exists" });
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
        console.log("✅ Doctor created successfully:", doctor);
        res.status(201).json({ message: "Doctor created successfully", doctor });
    } catch (error) {
        console.error("❌ Error in createDoctor:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        console.log("✅ Fetching all doctors...");
        const doctors = await Doctor.find();
        console.log("✅ Doctors fetched:", doctors.length);
        res.json({ doctors });
    } catch (error) {
        console.error("❌ Error in getAllDoctors:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get a specific doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        console.log(`✅ Fetching doctor with ID: ${req.params.id}`);
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            console.log("❌ Doctor not found:", req.params.id);
            return res.status(404).json({ message: "Doctor not found" });
        }

        console.log("✅ Doctor found:", doctor);
        res.json({ doctor });
    } catch (error) {
        console.error("❌ Error in getDoctorById:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Update doctor information
exports.updateDoctor = async (req, res) => {
    try {
        console.log("✅ Update Request received:", req.body);
        const { name, specialization, contact, email, qualifications, experience, address } = req.body;

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            console.log("❌ Doctor not found:", req.params.id);
            return res.status(404).json({ message: "Doctor not found" });
        }

        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.contact = contact || doctor.contact;
        doctor.email = email || doctor.email;
        doctor.qualifications = qualifications || doctor.qualifications;
        doctor.experience = experience || doctor.experience;
        doctor.address = address || doctor.address;

        await doctor.save();
        console.log("✅ Doctor updated successfully:", doctor);
        res.json({ message: "Doctor updated successfully", doctor });
    } catch (error) {
        console.error("❌ Error in updateDoctor:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    try {
        console.log(`✅ Deleting doctor with ID: ${req.params.id}`);
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            console.log("❌ Doctor not found:", req.params.id);
            return res.status(404).json({ message: "Doctor not found" });
        }

        await doctor.deleteOne();
        console.log("✅ Doctor deleted successfully:", req.params.id);
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        console.error("❌ Error in deleteDoctor:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
