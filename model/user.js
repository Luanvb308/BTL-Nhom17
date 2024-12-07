// models/user.js
const mongoose = require('mongoose');

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

// Kiểm tra nếu mô hình đã tồn tại trong mongoose.models
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = { userModel };  // Xuất mô hình userModel
