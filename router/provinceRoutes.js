// routes/provinceRoutes.js
const express = require('express');
const router = express.Router();

// Import controller để xử lý logic
const provinceController = require('../controller/provinceController');

// Định nghĩa route để lấy danh sách tỉnh thành
router.get('/api/provinces', provinceController.getProvinces);

module.exports = router;
