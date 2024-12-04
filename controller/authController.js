const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userModel } = require('../model/User');
const Cart = require('../model/cart');
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra nếu email không tồn tại
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu không chính xác' });
    }

    // Tạo token JWT
    const payload = {
        userId: user._id,
        username: user.username,
        email: user.email
    };

    // Tạo JWT với thời gian hết hạn là 1 giờ
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    // Trả về token và thông tin người dùng
    res.status(200).json({
        message: 'Đăng nhập thành công',
        token: token,
        user: {
            username: user.username,
            email: user.email
        }
    });
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    // Kiểm tra nếu mật khẩu không tồn tại hoặc rỗng
    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Mật khẩu không hợp lệ' });
    }

    try {
        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);  // 10 vòng muối là mức thông thường
        const hashedPassword = await bcrypt.hash(password, salt);  // Mã hóa mật khẩu

        // Tạo người dùng mới
        const newUser = new userModel({
            username,
            password: hashedPassword,
            email,
        });

        // Lưu người dùng mới vào cơ sở dữ liệu
        await newUser.save();

        // Tạo giỏ hàng với _id giống _id của người dùng
        const newCart = new Cart({
            _id: newUser._id,  // Dùng ID của người dùng làm ID giỏ hàng
            items: [],  // Giỏ hàng mới sẽ không có sản phẩm gì
        });

        // Lưu giỏ hàng vào cơ sở dữ liệu
        await newCart.save();

        // Trả về phản hồi thành công
        res.status(201).json({
            message: 'Đăng ký thành công',
            user: { username, email },
            cartId: newCart._id,  // Trả về ID giỏ hàng (ID này sẽ giống với _id của người dùng)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = { registerUser, loginUser };
