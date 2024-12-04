const express = require('express');
const router = express.Router();
const shippingController = require('../controller/shippingController');

// Route tính phí đơn hàng
router.post('/api/calculate-fee', shippingController.calculateShippingFee);

module.exports = router;
