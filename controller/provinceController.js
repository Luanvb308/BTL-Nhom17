// controllers/provinceController.js
const fetch = require('node-fetch');

// API lấy danh sách tỉnh thành từ GHN
exports.getProvinces = async (req, res) => {
    try {
        const token = "9fa9dedf-aa86-11ef-a89d-dab02cbaab48";

        if (!token) {
            return res.status(500).json({
                message: 'API token is not defined in environment variables'
            });
        }

        // Gửi yêu cầu GET tới API của GHN
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
                'token': token // Lấy token từ biến môi trường
            }
        });

        // Kiểm tra xem API có trả về kết quả hợp lệ không
        if (!response.ok) {
            return res.status(response.status).json({
                message: 'Error fetching provinces',
                error: response.statusText
            });
        }

        // Chuyển đổi dữ liệu từ API GHN sang JSON
        const data = await response.json();

        // Kiểm tra xem dữ liệu có hợp lệ không và trả về danh sách tỉnh với ID và tên
        if (data && data.data) {
            const provinces = data.data.map(province => ({
                id: province.ProvinceID,
                name: province.ProvinceName
            }));

            res.status(200).json({
                message: 'Provinces fetched successfully',
                provinces: provinces
            });
        } else {
            res.status(404).json({
                message: 'No provinces found'
            });
        }
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
