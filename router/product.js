// routes/productRouter.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');
router.get('/product', ProductController.showProductPage);
router.get('/product/:id', ProductController.getProductDetailsPage);

router.get('/product/delete/:id', ProductController.deleteProduct);
router.get('/search-products', ProductController.searchProducts);


router.get('/product/update/:id', ProductController.getUpdateProductForm);
router.post('/product/update/:id', ProductController.updateProduct);

router.get('/addProduct', ProductController.showAddProductPage);
router.post('/addProduct', ProductController.addProduct);

router.get('/api/products', ProductController.getProducts);
router.get('/api/products/:id', ProductController.getProductById);
module.exports = router;
