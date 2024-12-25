// Import mô hình user từ models/user.js
const { userModel } = require('../model/user');  // Đảm bảo đúng đường dẫn tới mô hình

// Controller để lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();  // Sử dụng userModel để tìm tất cả người dùng
    res.render('user', { users });  // Render view với danh sách người dùng
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
};
exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;  // Lấy ID người dùng từ URL
      await userModel.findByIdAndDelete(userId);  // Xóa người dùng theo ID
      res.status(200).send({ success: true, message: 'User deleted successfully.' });  // Trả lời thành công
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).send({ success: false, message: 'Error deleting user.' });  // Trả lời lỗi
    }
  };
