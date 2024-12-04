const fetch = require('node-fetch');  // Import thư viện fetch để gửi yêu cầu API

// Hàm tính phí đơn hàng
exports.calculateShippingFee = async (req, res) => {
    try {
        // Fix cứng giá trị các tham số
        const fixedServiceId = 53321; // Giả sử bạn chọn dịch vụ ID là 1 (Express)
        const fixedInsuranceValue = 500000; // Giá trị bảo hiểm
        const fixedCoupon = null; // Không có mã giảm giá
        const fixedWeightPerItem = 1000; // Trọng lượng của mỗi sản phẩm (gram)
        const fixedLengthPerItem = 15; // Chiều dài của mỗi sản phẩm (cm)
        const fixedWidthPerItem = 15; // Chiều rộng của mỗi sản phẩm (cm)
        const fixedHeightPerItem = 15; // Chiều cao của mỗi sản phẩm (cm)
        const quantity =1;
        // Lấy số lượng sản phẩm từ body request
        const { to_ward_code, to_district_id, from_district_id } = req.body;

        // Kiểm tra các tham số bắt buộc
        if (!quantity || !to_ward_code || !to_district_id || !from_district_id) {
            return res.status(400).json({ message: 'Quantity, to_ward_code, to_district_id, and from_district_id are required' });
        }

        // Tính toán các thông số tổng
        const totalWeight = fixedWeightPerItem * quantity;  // Trọng lượng tổng (gram)
        const totalLength = fixedLengthPerItem ;  // Chiều dài tổng (cm)
        const totalWidth = fixedWidthPerItem ;    // Chiều rộng tổng (cm)
        const totalHeight = fixedHeightPerItem * quantity;  // Chiều cao tổng (cm)

        // Fix token và shop_id
        const token = "9fa9dedf-aa86-11ef-a89d-dab02cbaab48"; // Giá trị token cố định
        const shop_id = 5477700; // Giá trị shop_id cố định

        if (!token || !shop_id) {
            return res.status(500).json({ message: 'API token or shop_id is not defined in environment variables' });
        }

        // Xây dựng payload cho yêu cầu gửi đến API GHN
        const payload = {
            service_id: fixedServiceId,
            insurance_value: fixedInsuranceValue,
            coupon: fixedCoupon,
            to_ward_code: to_ward_code,
            to_district_id: to_district_id,
            from_district_id: from_district_id,
            weight: totalWeight,
            length: totalLength,
            width: totalWidth,
            height: totalHeight
        };

        // Gửi yêu cầu tính phí tới API GHN
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
            method: 'POST',
            headers: {
                'token': token,
                'shop_id': shop_id,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Kiểm tra kết quả trả về từ API GHN
        if (!response.ok) {
            return res.status(response.status).json({
                message: 'Error calculating shipping fee',
                error: response.statusText
            });
        }

        // Chuyển dữ liệu trả về từ API GHN thành JSON
        const data = await response.json();

        // Kiểm tra dữ liệu trả về và trả kết quả tính phí
        if (data && data.data) {
            res.status(200).json({
                message: 'Shipping fee calculated successfully',
                fee: data.data
            });
        } else {
            res.status(404).json({ message: 'Error calculating fee' });
        }

    } catch (error) {
        console.error('Error calculating shipping fee:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
