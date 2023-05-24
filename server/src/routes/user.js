const express = require('express');
const router = express.Router();

// Import the necessary controllers and middlewares
const UserController = require('../controllers/user');
const authMiddleware  = require('../middlewares/authMiddleware');

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

// Protected route (example)
router.get('/profile', authMiddleware, UserController.getProfile);

module.exports = router;
