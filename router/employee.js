const express = require('express');
const router = express.Router();
const {
    getAllEmployees,
    showNewEmployeeForm,
    createNewEmployee,
    showEditEmployeeForm,
    updateEmployee,
    deleteEmployee
} = require('../controller/employeeController');

// Route để lấy danh sách nhân viên
router.get('/employee', getAllEmployees);

// Route để hiển thị form thêm nhân viên
router.get('/employee/new', showNewEmployeeForm);

// Route để thêm nhân viên mới
router.post('/employee', createNewEmployee);
router.post('/employee/:id', updateEmployee);
// Route để hiển thị form chỉnh sửa nhân viên
router.get('/employee/edit/:id', showEditEmployeeForm);

// Route để cập nhật thông tin nhân viên
router.post('/employee/edit/:id', updateEmployee);

// Route để xóa nhân viên
router.get('/employee/delete/:id', deleteEmployee);

module.exports = router;
