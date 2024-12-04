const express = require('express');
const router = express.Router();
const {
    getAllLocations,
    renderCreateLocationForm,
    createLocation,
    renderEditLocationForm,
    updateLocation,
    deleteLocation,
    deleteLocationAPI
} = require('../controller/locationController');

// Hiển thị danh sách Location
router.get('/locations', getAllLocations);

// Hiển thị form tạo Location mới
router.get('/create-location', renderCreateLocationForm);

// Xử lý tạo Location mới
router.post('/create-location', createLocation);

// Hiển thị form chỉnh sửa Location
router.get('/edit-location/:id', renderEditLocationForm);

// Xử lý cập nhật Location
router.post('/edit-location/:id', updateLocation);

// Xử lý xóa Location (HTML phản hồi)
router.post('/delete-location/:id', deleteLocation);

// Xóa Location qua API (JSON phản hồi)
router.delete('/delete-location/:id', deleteLocationAPI);

module.exports = router;
