const mongoose = require('mongoose');

// // Kết nối MongoDB
// mongoose.connect('mongodb://localhost:27017/yourDatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// Định nghĩa Schema cho User
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
    },
    {
        collection: 'User',
        timestamps: true,
    }
);

// Tạo mô hình User
const userModel = mongoose.model('User', userSchema);

// Xuất mô hình và mongoose
module.exports = { mongoose, userModel };
