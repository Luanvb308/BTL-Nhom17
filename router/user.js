// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Route để lấy danh sách người dùng
router.get('/user', userController.getUsers);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
