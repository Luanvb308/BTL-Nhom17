// // models/cartModel.js
// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     items: [
//         {
//             productid: {
//                 type: String,  // Liên kết sản phẩm với giỏ hàng
//                 ref: 'Product',
//                 required: true,
//             },
//             quality: {
//                 type: Number,
//                 required: true,
//                 min: 1,  // Số lượng sản phẩm phải lớn hơn 0
//             },
//         },
//     ],
// }, {
//     collection: 'Cart',
//     timestamps: true,
// });
// // Tính toán tổng tiền của giỏ hàng (không lưu vào cơ sở dữ liệu)
// cartSchema.virtual('total').get(async function() {
//     let total = 0;

//     // Lấy thông tin các sản phẩm có trong giỏ hàng và tính tổng
//     for (let item of this.items) {
//         const product = await mongoose.model('Product').findById(item.productid);
//         if (product) {
//             total += product.price * item.quality;
//         }
//     }

//     return total;
// });
// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;






// models/cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết với User model
        required: true,
    },
    items: [
        {
            productid: {
                type: String, // Chuyển sang ObjectId
                ref: 'Product', // Liên kết với Product model
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
    timestamps: true,
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

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
