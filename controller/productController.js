const Product = require('../model/product'); // Đường dẫn đến mô hình Product
const mongoose = require('mongoose'); // Đảm bảo bạn đã import mongoose
// Hàm lấy danh sách sản phẩm
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Lấy tất cả sản phẩm từ MongoDB
        res.json(products); // Trả về dữ liệu JSON cho các yêu cầu API
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).send('Lỗi server');
    }
};

// Hàm render trang sản phẩm
const showProductPage = async (req, res) => {
    try {
        const products = await Product.find(); // Lấy tất cả sản phẩm từ MongoDB
        console.log('Products:', products); // Kiểm tra dữ liệu sản phẩm
        res.render('product', { products });  // Render trang product.ejs với danh sách sản phẩm
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).send('Lỗi server');
    }
};

const getProductById = async (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return null; // Hoặc throw error tùy theo logic của bạn
    }
    try {
        const product = await Product.findById(productId); // Tìm sản phẩm theo ID
        return product;
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm theo ID:', error);
        return null;
    }
};

// Hàm render trang chi tiết sản phẩm
// Hàm xử lý yêu cầu cho trang chi tiết sản phẩm
const getProductDetailsPage = async (req, res) => {
    const productId = req.params.id; // Lấy ID sản phẩm từ URL

    try {
        // Tìm sản phẩm theo ID (dạng chuỗi)
        const product = await Product.findById(productId);
        if (product) {
            res.render('product_detail', { product });
        } else {
            console.log('Product not found');
            res.status(404).send('Sản phẩm không tồn tại');
        }
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm theo ID:', error);
        res.status(500).send('Lỗi server');
    }
};
const addProduct = async (req, res) => {
    try {
        console.log(req.body);  // Kiểm tra dữ liệu gửi lên từ form
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('product');
    } catch (error) {
        console.error(error);
    }
};

const showAddProductPage = (req, res) => {
    res.render('addProduct'); // Render file addProduct.ejs
};
const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Kiểm tra nếu productId là một chuỗi hợp lệ
      if (!productId || typeof productId !== 'string' || productId.trim().length === 0) {
        return res.status(400).send('Invalid product ID');
      }
  
      // Tiến hành xóa sản phẩm
      const result = await Product.findByIdAndDelete(productId);
  
      if (!result) {
        return res.status(404).send('Product not found');
      }
  
      // Quay lại trang danh sách sản phẩm
      res.redirect('/product');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const searchProducts = async (req, res) => {
    try {
        // Lấy các tham số tìm kiếm từ query string
        const { name, price, brand } = req.query;

        // Tạo đối tượng điều kiện tìm kiếm
        let searchCriteria = {};

        if (name) {
            searchCriteria.name = { $regex: name, $options: 'i' };  // Tìm theo tên (không phân biệt chữ hoa/thường)
        }
        if (price) {
            searchCriteria.price = { $lte: price };  // Tìm sản phẩm có giá <= giá nhập vào
        }
        if (brand) {
            searchCriteria.brand = { $regex: brand, $options: 'i' };  // Tìm theo hãng (không phân biệt chữ hoa/thường)
        }

        // Tìm kiếm sản phẩm trong cơ sở dữ liệu
        const products = await Product.find(searchCriteria);

        // Kiểm tra nếu không có sản phẩm
        if (products.length === 0) {
            return res.render('product', { message: "NO PRODUCT", products: [] });
        }

        // Render lại trang với danh sách sản phẩm tìm được
        res.render('product', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error searching products");
    }
};

const getUpdateProductForm = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('updateProduct', { product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Xử lý cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const productId = req.body._id; // Lấy ID từ form
        const updatedData = {
            name: req.body.name,
            hardness: req.body.hardness,
            racketFrame: req.body.racketFrame,
            weight: req.body.weight,
            balance: req.body.balance,
            swing: req.body.swing,
            maxStrength: req.body.maxStrength,
            color: req.body.color,
            manufacture: req.body.manufacture,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
        };

        const product = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.redirect('/product'); // Quay lại danh sách sản phẩm sau khi cập nhật
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

// Xuất các hàm
module.exports = {
    getProducts,
    showProductPage,
    getProductDetailsPage,
    getProductById,
    addProduct,
    showAddProductPage,
    deleteProduct,
    searchProducts,
    getUpdateProductForm,
    updateProduct
};