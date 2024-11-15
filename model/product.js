const mongoose = require("mongoose");
const db = require('../db/index');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id:{ type: String , require : true },
    name: { type: String, required: true },
    hardness: { type: String, required: false },
    racketFrame: { type: String, required: false },
    weight: { type: Number, required: false },
    balance: { type: String, required: false },
    swing: { type: String, required: false },
    maxStrength: { type: Number, required: false },
    color: { type: String, required: false },
    manufacture: { type: String, required: false },
    brand: { type: String, required: false },
    image: { type: String, required: false },
    price: { type: Number, required: false },
    quantity: { type: Number, required: false },
    description: { type: String, required: false }

}, {
    collection: "Product",
});

// Kiểm tra nếu model chưa tồn tại thì khởi tạo
module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);