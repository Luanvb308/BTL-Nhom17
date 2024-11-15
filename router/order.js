const express = require('express');
const { OrderModel } = require('../model/order'); // Đảm bảo đường dẫn đúng
const router = express.Router();

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

module.exports = router;
