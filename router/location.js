const express = require('express');
const router = express.Router();
const { LocationModel } = require('../model/location'); // Đường dẫn tới file chứa mô hình Location

// Route hiển thị danh sách Location
router.get('/location', async (req, res) => {
    try {
        const locations = await LocationModel.find(); // Lấy tất cả dữ liệu từ bảng Location
        res.render('location', { locations }); // Gửi dữ liệu tới file EJS
    } catch (error) {
        res.status(500).send('Error fetching locations');
    }
});
// Route hiển thị form Add Location
router.get('/create-location', (req, res) => {
    res.render('createLocation'); // Hiển thị form từ file EJS
});

router.post('/create-location', async (req, res) => {
    try {
        const { position, map, sdt, city } = req.body;

        // Tạo Location mới
        const newLocation = new LocationModel({ position, map, sdt, city });
        await newLocation.save();

        // Sau khi lưu, chuyển hướng về trang danh sách
        res.redirect('/locations');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create location');
    }
});
router.get('/locations', async (req, res) => {
    try {
        const locations = await LocationModel.find(); // Lấy danh sách từ database
        res.render('location', { locations }); // Hiển thị danh sách
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to load locations');
    }
});
// Route xóa location
router.post('/delete-location/:id', async (req, res) => {
    const locationId = req.params.id; // Lấy id từ URL

    try {
        const deletedLocation = await LocationModel.findByIdAndDelete(locationId); // Tìm và xóa location theo _id

        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.redirect('/locations'); // Sau khi xóa thành công, chuyển hướng về trang danh sách
    } catch (error) {
        res.status(500).send('Error deleting location');
    }
});
// Route hiển thị trang chỉnh sửa Location
router.get('/edit-location/:id', async (req, res) => {
    try {
        const locationId = req.params.id;
        const location = await LocationModel.findById(locationId); // Lấy Location theo ID
        
        if (!location) {
            return res.status(404).send('Location not found');
        }

        // Hiển thị trang chỉnh sửa và truyền thông tin Location vào form
        res.render('editLocation', { location });
    } catch (error) {
        res.status(500).send('Error fetching location');
    }
});

// Route cập nhật thông tin Location
router.post('/edit-location/:id', async (req, res) => {
    try {
        const locationId = req.params.id;
        const { position, map, sdt, city } = req.body;

        // Cập nhật thông tin Location trong cơ sở dữ liệu
        const updatedLocation = await LocationModel.findByIdAndUpdate(locationId, {
            position,
            map,
            sdt,
            city
        }, { new: true });

        if (!updatedLocation) {
            return res.status(404).send('Location not found');
        }

        // Sau khi cập nhật, chuyển hướng về trang danh sách
        res.redirect('/locations');
    } catch (error) {
        res.status(500).send('Error updating location');
    }
});
// Route xóa location
router.delete('/delete-location/:id', async (req, res) => {
    const locationId = req.params.id;

    try {
        const deletedLocation = await LocationModel.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting location');
    }
});


module.exports = router;
