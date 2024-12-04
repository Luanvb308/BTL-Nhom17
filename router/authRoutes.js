// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controller/authController');

const router = express.Router();

// Định nghĩa route đăng ký
router.post('/signup', registerUser);
// Định nghĩa route đăng nhập
router.post('/login', loginUser);

module.exports = router;
