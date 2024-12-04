// routes/cartRoutes.js
const express = require('express');
const cartController = require('../controller/cartController')
const router = express.Router();
// Định tuyến API để thêm sản phẩm vào giỏ hàng
router.post('/api/add-to-cart', cartController.addToCart);

router.get('/api/get-cart/:id', cartController.getCartById);

module.exports = router;
