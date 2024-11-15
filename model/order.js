
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Position is required'],
        },
        position: {
            type: String,
            required: [true, 'Map is required'],
        },
        quantity: {
            type: String,
            required: [true, 'SDT is required'],
        },
        total: {
            type: String,
            required: [true, 'City is required'],
        },
    },
    {
        collection: 'Order',
        timestamps: true,
    }
);

// Tạo mô hình Location
const OderModel = mongoose.model('Order', orderSchema);

// Xuất mô hình để sử dụng trong các file khác
module.exports = { OrderModel };  // Đảm bảo xuất mô hình LocationModel
