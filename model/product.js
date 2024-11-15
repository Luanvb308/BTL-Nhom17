const mongoose = require("mongoose");
const db = require('../db/index');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: { type: String, maxLength: 255 },
    brand: { type: String, maxLength: 255 },
    name: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    collection: "Product",
});

// Kiểm tra nếu model chưa tồn tại thì khởi tạo
module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
