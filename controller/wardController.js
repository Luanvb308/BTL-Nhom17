const fetch = require('node-fetch');  // Import thư viện fetch để gửi yêu cầu API

// Hàm xử lý lấy thông tin phường/xã theo district_id
exports.getWards = async (req, res) => {
    try {
        const { district_id } = req.params;  // Lấy district_id từ tham số URL

        // Kiểm tra nếu district_id không hợp lệ
        if (!district_id || isNaN(district_id)) {
            return res.status(400).json({
                message: 'Invalid district_id'
            });
        }

        // Lấy token từ biến môi trường (hoặc bạn có thể thay token cố định như trong ví dụ trước)
        const token = process.env.GHN_API_TOKEN || "9fa9dedf-aa86-11ef-a89d-dab02cbaab48";  // Đảm bảo bạn đã đặt token trong .env

        if (!token) {
            return res.status(500).json({
                message: 'API token is not defined in environment variables'
            });
        }

        // Gửi yêu cầu GET tới API lấy phường/xã của quận/huyện
        const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`, {
            method: 'GET',
            headers: {
                'token': token
            }
        });

        // Kiểm tra kết quả trả về từ API
        if (!response.ok) {
            return res.status(response.status).json({
                message: 'Error fetching wards',
                error: response.statusText
            });
        }

        // Chuyển đổi dữ liệu API thành JSON
        const data = await response.json();

        // Kiểm tra dữ liệu trả về có hợp lệ không và trả về thông tin phường/xã
        if (data && data.data) {
            const wards = data.data;  // Lấy danh sách phường/xã
            res.status(200).json({
                message: 'Wards fetched successfully',
                wards: wards
            });
        } else {
            res.status(404).json({
                message: 'No wards found for this district'
            });
        }
    } catch (error) {
        console.error('Error fetching wards:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
