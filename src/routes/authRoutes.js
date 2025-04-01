const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Route for registering a user
router.post('/register', register);

// Route for logging in a user
router.post('/login', login);

module.exports = router;


