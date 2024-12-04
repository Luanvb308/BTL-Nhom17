const mongoose = require('mongoose');

// Định nghĩa schema giỏ hàng
const cartSchema = new mongoose.Schema({
    items: [
        {
            productid: {
                type: String,  // Liên kết với Product model
                ref: 'Product',
                required: true,
            },
            quality: {
                type: Number,
                required: true,
                min: 1,  // Số lượng sản phẩm phải lớn hơn 0
            },
        },
    ],
}, {
    collection: 'Cart',
    timestamps: true,  // Lưu thời gian tạo và cập nhật
});

// Tính tổng tiền của giỏ hàng trong API thay vì schema
cartSchema.methods.calculateTotal = async function() {
    let total = 0;
    for (let item of this.items) {
        const product = await mongoose.model('Product').findById(item.productid);
        if (product) {
            total += product.price * item.quality;
        }
    }
    return total;
};

// Đảm bảo rằng khi tạo giỏ hàng, userId được sử dụng như ID của giỏ hàng
cartSchema.pre('save', async function(next) {
    if (!this._id) {
        this._id = this.userId.toString();  // Lấy _id của giỏ hàng là ID của người dùng
    }
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
