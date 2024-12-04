const fetch = require('node-fetch');  // Import thư viện fetch để gửi yêu cầu API

// Hàm xử lý lấy thông tin quận/huyện theo province_id
exports.getDistricts = async (req, res) => {
    try {
        const { province_id } = req.params;  // Lấy province_id từ tham số URL

        // Kiểm tra nếu province_id không hợp lệ
        if (!province_id || isNaN(province_id)) {
            return res.status(400).json({
                message: 'Invalid province_id'
            });
        }

        // Lấy token từ biến môi trường (hoặc bạn có thể thay token cố định như trong ví dụ trước)
        const token = process.env.GHN_API_TOKEN || "9fa9dedf-aa86-11ef-a89d-dab02cbaab48";  // Đảm bảo bạn đã đặt token trong .env

        if (!token) {
            return res.status(500).json({
                message: 'API token is not defined in environment variables'
            });
        }

        // Gửi yêu cầu GET tới API lấy quận/huyện của tỉnh
        const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`, {
            method: 'GET',
            headers: {
                'token': token
            }
        });

        // Kiểm tra kết quả trả về từ API
        if (!response.ok) {
            return res.status(response.status).json({
                message: 'Error fetching districts',
                error: response.statusText
            });
        }

        // Chuyển đổi dữ liệu API thành JSON
        const data = await response.json();

        // Kiểm tra dữ liệu trả về có hợp lệ không và trả về thông tin quận/huyện
        if (data && data.data) {
            const districts = data.data;  // Lấy danh sách quận/huyện
            res.status(200).json({
                message: 'Districts fetched successfully',
                districts: districts
            });
        } else {
            res.status(404).json({
                message: 'No districts found for this province'
            });
        }
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
