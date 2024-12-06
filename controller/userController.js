const express = require('express');
const mongoose = require('mongoose');
const { userModel } = require('./'); // Nhập mô hình User

const app = express();

// API để lấy thông tin người dùng
app.get('/api/users', async (req, res) => {
    try {
        const users = await userModel.find(); // Lấy tất cả người dùng từ MongoDB
        res.json(users); // Trả về dữ liệu người dùng dưới dạng JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
