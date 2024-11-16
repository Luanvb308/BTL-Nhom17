const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController'); // Đảm bảo đường dẫn đúng

// Route để hiển thị form tạo đơn hàng mới
router.get('/create-order', orderController.showCreateOrderForm);

// Route để xử lý việc tạo đơn hàng mới
router.post('/create-order', orderController.createOrder);

// Route để hiển thị danh sách đơn hàng
router.get('/orders', orderController.listOrders);

// Route để xóa đơn hàng
router.delete('/delete-order/:id', orderController.deleteOrder);

// Route để hiển thị form chỉnh sửa đơn hàng
router.get('/edit-order/:id', orderController.showEditOrderForm);

// Route để xử lý chỉnh sửa đơn hàng
router.post('/edit-order/:id', orderController.editOrder);

module.exports = router;
