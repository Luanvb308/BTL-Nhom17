
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, 'Position is required'],
        },
        name: {
            type: String,
            required: [true, 'Map is required'],
        },
        sdt: {
            type: String,
            required: [true, 'SDT is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
    },
    {
        collection: 'Employee',
        timestamps: true,
    }
);

// Tạo mô hình Location
const EmployeeModel = mongoose.model('Employee', employeeSchemaSchema);

// Xuất mô hình để sử dụng trong các file khác
module.exports = { EmployeeModel };  // Đảm bảo xuất mô hình LocationModel
