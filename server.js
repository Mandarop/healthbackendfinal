const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json()); // Extra safeguard for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware (allows requests from different origins)
app.use(cors());

// Import routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/doctors', require('./src/routes/doctorRoutes'));
app.use('/api/patients', require('./src/routes/patientRoutes'));

// Global error handling middleware
const errorHandler = require('./src/middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
