const express = require('express');
const router = express.Router();
const districtController = require('../controller/districtController');

// Route để lấy thông tin quận/huyện theo province_id
router.get('/api/districts/:province_id', districtController.getDistricts);

module.exports = router;
