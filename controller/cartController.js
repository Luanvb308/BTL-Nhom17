// controllers/cartController.js
const Cart = require('../model/cart');
const Product = require('../model/product');
// API để thêm sản phẩm vào giỏ hàng
const mongoose = require('mongoose');
// Lấy thông tin giỏ hàng của người dùng


exports.getCartById = async (req, res) => {
    const { id } = req.params;

    try {
        // Tìm giỏ hàng theo cartId và populate các sản phẩm trong giỏ hàng
        const cart = await Cart.findById(id).populate('items.productid');

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tìm thấy' });
        }

        // Tính toán tổng tiền giỏ hàng
        let total = 0;
        for (const item of cart.items) {
            const product = item.productid;
            total += product.price * item.quality;
        }

        // Trả về chi tiết giỏ hàng và tổng tiền
        res.status(200).json({
            cart: cart.items,
            total: total
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server khi lấy giỏ hàng' });
    }
};



// API thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Kiểm tra nếu sản phẩm và số lượng hợp lệ
        if (!productId || quantity <= 0 || !userId) {
            return res.status(400).json({ message: 'Invalid product or quantity' });
        }

        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Tìm giỏ hàng của người dùng (sử dụng userId để tìm)
        let cart = await Cart.findOne({ userId: userId });

        // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
        if (!cart) {
            cart = new Cart({
                userId: userId,
                items: [{ productid: productId, quality: quantity }]
            });
        } else {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingItemIndex = cart.items.findIndex(item => item.productid.toString() === productId.toString());

            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
                cart.items[existingItemIndex].quality += quantity;
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
                cart.items.push({
                    productid: productId,  // productId là ObjectId, đảm bảo không phải chuỗi
                    quality: quantity,
                });
            }
        }

        // Lưu giỏ hàng vào cơ sở dữ liệu
        await cart.save();

        // Trả về giỏ hàng đã cập nhật
        const updatedCart = await Cart.findById(cart._id).populate('items.productid', 'name price');  // Thêm populate để lấy tên và giá sản phẩm
        res.status(200).json({
            message: 'Product added to cart successfully',
            cart: updatedCart,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};