const express = require('express');
const { OrderModel } = require('../model/order'); // Đảm bảo đường dẫn đúng

// Hiển thị form tạo đơn hàng mới
const showCreateOrderForm = (req, res) => {
    res.render('createOrder'); // Điều hướng đến trang createOrder.ejs
};

// Xử lý việc tạo đơn hàng mới
const createOrder = async (req, res) => {
    try {
        const { username, position, quantity, total, month } = req.body;
        const newOrder = new OrderModel({
            username,
            position,
            quantity,
            total,
            month,
        });
        await newOrder.save(); // Lưu đơn hàng vào database
        res.redirect('/orders'); // Điều hướng về trang danh sách đơn hàng sau khi tạo thành công
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra khi tạo đơn hàng');
    }
};

// Hiển thị bảng đơn hàng
const listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();

        const revenueByMonth = new Array(12).fill(0); // Mảng chứa tổng doanh thu từng tháng

        // Tính tổng doanh thu cho từng tháng
        orders.forEach(order => {
            const month = order.month - 1; // Giảm 1 vì mảng bắt đầu từ 0
            revenueByMonth[month] += order.total; // Cộng tổng tiền vào tháng tương ứng
        });

        const revenueByMonthInThousands = revenueByMonth.map(revenue => revenue / 1000);  // Chia cho 1000

        res.render('order', { orders, revenueByMonthInThousands }); // Gửi dữ liệu vào view
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra khi lấy dữ liệu');
    }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        await OrderModel.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

// Hiển thị form chỉnh sửa đơn hàng
const showEditOrderForm = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.render('editOrder', { order }); // Trả về view editOrder.ejs
    } catch (error) {
        res.status(500).send('Error fetching order data');
    }
};

// Xử lý chỉnh sửa đơn hàng
const editOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedData = {
            username: req.body.username,
            position: req.body.position,
            quantity: req.body.quantity,
            total: req.body.total,
            month: req.body.month,
        };

        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });

        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/orders'); // Chuyển hướng về trang danh sách orders
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Error updating order');
    }
};

// Export tất cả controller để sử dụng trong router
module.exports = {
    showCreateOrderForm,
    createOrder,
    listOrders,
    deleteOrder,
    showEditOrderForm,
    editOrder
     // Đảm bảo export router
};
