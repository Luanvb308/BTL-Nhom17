const express = require('express');
const router = express.Router();
const wardController = require('../controller/wardController');

// Route để lấy thông tin phường/xã theo district_id
router.get('/api/wards/:district_id', wardController.getWards);

module.exports = router;
