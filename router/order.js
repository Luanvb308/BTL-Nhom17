const express = require('express');
const router = express.Router();

// Route render trang orders.ejs
router.get('/orders', (req, res) => {
    res.render('orders');
});

module.exports = router;