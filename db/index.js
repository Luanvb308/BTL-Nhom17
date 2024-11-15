const mongoose = require('mongoose');

async function connect() {
    try {
        // Kiểm tra trạng thái kết nối trước khi thực hiện kết nối mới
        if (mongoose.connection.readyState === 0) {  // 0 là trạng thái "disconnected"
            const uri = 'mongodb+srv://nguyenvanluan2004vb:12346@cluster0.mmmh3.mongodb.net/VNBSPORT';

            // Kết nối tới MongoDB mà không sử dụng useNewUrlParser và useUnifiedTopology nữa
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,  // Timeout cho kết nối (5s)
            });

            console.log("Kết nối MongoDB thành công!");
        } else {
            console.log("MongoDB đã được kết nối.");
        }
    } catch (error) {
        console.error("Lỗi khi kết nối MongoDB:", error);
        process.exit(1);  // Dừng ứng dụng nếu không thể kết nối
    }
}

module.exports = { connect, mongoose };
