const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId, // Đảm bảo _id là ObjectId
            auto: true, // Tự động tạo ObjectId nếu không được cung cấp
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        age: {
            type: String, // Có thể đổi sang Number nếu cần
            required: [true, 'Age is required'],
        },
        position: {
            type: String,
            required: [true, 'Position is required'],
        },
        shopName: {
            type: String,
            required: [true, 'Shop Name is required'],
        },
    },
    {
        collection: 'Employee', // Tên collection trong MongoDB
        timestamps: true, // Thêm createdAt và updatedAt tự động
    }
);

// Tạo mô hình Employee
const EmployeeModel = mongoose.model('Employee', employeeSchema);

// Xuất mô hình để sử dụng trong các file khác
module.exports = { EmployeeModel };
