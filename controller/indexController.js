// controller/HomeController.js

const connection = require('../db/index');

// HomeController là một hàm xử lý request và render view
const IndexController = (req, res) => {
  const username = req.session.username||null; 
  res.render('index', {username: username});  // Giả sử 'home' là một view hợp lệ
};

// Xuất hàm HomeController
module.exports = IndexController;
