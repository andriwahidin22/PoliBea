const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Route Login
router.post('/login', authController.login);

// Route untuk cek user berdasarkan token (butuh autentikasi)
router.get('/admin', authMiddleware, authController.getProfile);

module.exports = router;