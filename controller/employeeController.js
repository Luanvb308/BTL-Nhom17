const { EmployeeModel } = require('../model/employee');

// Lấy danh sách tất cả nhân viên
const getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.status(200).json(employees); 
        res.render('employee', { employees });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Hiển thị form thêm nhân viên
const showNewEmployeeForm = (req, res) => {
    res.render('employeeAdd');  
};

// Thêm nhân viên mới
const createNewEmployee = async (req, res) => {
    try {
        const { name, phone, age, position, shopName } = req.body;

        // Tạo mới nhân viên
        await EmployeeModel.create({ name, phone, age, position, shopName });

        // Chuyển hướng về danh sách nhân viên
        res.redirect('/employee');
    } catch (err) {
        console.error(err);
        res.status(400).send('Failed to create employee');
    }
};

// Hiển thị form chỉnh sửa nhân viên
const showEditEmployeeForm = async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.render('employeeUpdate', { employee });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Cập nhật thông tin nhân viên
const updateEmployee = async (req, res) => {
    try {
        const { name, phone, age, position, shopName } = req.body;

        // Cập nhật thông tin nhân viên
        const employee = await EmployeeModel.findByIdAndUpdate(
            req.params.id, 
            { name, phone, age, position, shopName },
            { new: true }  // Trả về đối tượng sau khi cập nhật
        );

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        // Chuyển hướng về danh sách nhân viên
        res.redirect('/employee');
    } catch (err) {
        console.error(err);
        res.status(400).send('Failed to update employee');
    }
};

// Xóa nhân viên
const deleteEmployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.redirect('/employee');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllEmployees,
    showNewEmployeeForm,
    createNewEmployee,
    showEditEmployeeForm,
    updateEmployee,
    deleteEmployee,
};
