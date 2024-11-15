// routes/productRouter.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');

router.get('/product', ProductController.showProductPage);
router.get('/product/:id', ProductController.getProductDetailsPage);
router.get('/addProduct', ProductController.showAddProductPage);
router.post('/addProduct', ProductController.addProduct);

router.get('/product/delete/:id', ProductController.deleteProduct);
router.get('/search-products', ProductController.searchProducts);

// Route hiển thị form cập nhật (GET)
router.get('/product/update/:id', ProductController.getUpdateProductForm);

// Route xử lý cập nhật sản phẩm (POST)
router.post('/product/update/:id', ProductController.updateProduct);

module.exports = router;
