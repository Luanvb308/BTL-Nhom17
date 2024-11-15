
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        position: {
            type: String,
            required: [true, 'Position is required'],
        },
        map: {
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
        collection: 'Location',
        timestamps: true,
    }
);

// Tạo mô hình Location
const LocationModel = mongoose.model('Location', locationSchema);

// Xuất mô hình để sử dụng trong các file khác
module.exports = { LocationModel };  // Đảm bảo xuất mô hình LocationModel
