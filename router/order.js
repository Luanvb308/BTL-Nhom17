const express = require('express');
const { OrderModel } = require('../model/order'); // Đảm bảo đường dẫn đúng
const router = express.Router();
// Route để hiển thị form tạo đơn hàng mới
router.get('/create-order', (req, res) => {
    res.render('createOrder'); // Điều hướng đến trang createOrder.ejs
});

// Route để xử lý việc tạo đơn hàng mới
router.post('/create-order', async (req, res) => {
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
        res.redirect('/order'); // Điều hướng về trang danh sách đơn hàng sau khi tạo thành công
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra khi tạo đơn hàng');
    }
});
// Route để hiển thị bảng đơn hàng
router.get('/orders', async (req, res) => {
    try {
        // Lấy tất cả đơn hàng từ database
        const orders = await OrderModel.find();

        // Tính toán doanh thu theo tháng (tính nghìn VND)
        const revenueByMonth = new Array(12).fill(0); // Mảng chứa tổng doanh thu từng tháng

        // Tính tổng doanh thu cho từng tháng
        orders.forEach(order => {
            const month = order.month - 1; // Lấy tháng từ trường 'month' (giảm 1 vì mảng bắt đầu từ 0)
            console.log("Month: ", month, "Total: ", order.total);  // Kiểm tra từng tháng và tổng tiền
            revenueByMonth[month] += order.total; // Cộng tổng tiền vào tháng tương ứng
        });

        // Kiểm tra doanh thu sau khi tính toán
        console.log("Revenue by Month: ", revenueByMonth);

        // Chia doanh thu cho 1000 để hiển thị nghìn VND
        const revenueByMonthInThousands = revenueByMonth.map(revenue => revenue / 1000);  // Chia cho 1000

        // Gửi dữ liệu 'orders' và 'revenueByMonthInThousands' vào file EJS để render
        res.render('order', { orders, revenueByMonthInThousands });  // 'orders' và 'revenueByMonthInThousands' sẽ được truyền vào EJS
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra khi lấy dữ liệu');
    }
});
router.delete('/delete-order/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
        await OrderModel.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});
router.get('/edit-order/:id', async (req, res) => {
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
});

router.post('/edit-order/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedData = {
            username: req.body.username,
            position: req.body.position,
            quantity: req.body.quantity,
            total: req.body.total,
            month: req.body.month,
        };

        // Cập nhật thông tin order trong database
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });

        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }

        // Redirect lại trang danh sách order hoặc gửi phản hồi thành công
        res.redirect('/orders'); // Chuyển hướng về trang danh sách orders
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Error updating order');
    }
});
module.exports = router;
