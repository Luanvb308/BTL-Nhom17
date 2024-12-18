const express = require('express');
const session = require('express-session');
const path = require('path');


const app = express();
const { connect } = require('./db/index');
const productRouter = require('./router/product');
const indexRouter = require('./router/index');
const employeeRoutes = require('./router/employee'); 
const orderRouter = require('./router/order');  // Đảm bảo đường dẫn đúng
const authRouter = require('./router/authRoutes')
const cartRouter = require('./router/cart')
const locationRouter = require('./router/location')
const province = require('./router/provinceRoutes')
const districRouter = require('./router/districtRouter')
const wardRouter = require('./router/wardRouter')
const shippingRouter = require('./router/shippingRouter')
const userRouter = require('./router/user')



// Cấu hình express-session
app.use(session({
  secret: 'your-secret-key',  // Thay 'your-secret-key' bằng một chuỗi bí mật an toàn
  resave: false,              // Không lưu lại session nếu không thay đổi
  saveUninitialized: true,    // Lưu session khi chưa khởi tạo
  cookie: { secure: false }   // Nếu bạn sử dụng HTTPS, set 'secure: true'
}));
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

// Thay vì dùng 'views', bạn sử dụng 'view' nếu đó là thư mục chứa tệp EJS
app.set('views', path.join(__dirname, 'views'));  // Sử dụng 'view' thay cho 'views'
app.set('view engine', 'ejs');



// Cấu hình thư mục chứa các file tĩnh và views
app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// nghiajjjj
// Middleware để phân tích dữ liệu từ các yêu cầu POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Kết nối đến cơ sở dữ liệu
connect();
app.use('/', indexRouter);
app.use('/',productRouter);
app.use('/product', productRouter);
// Sử dụng router
app.use('/', orderRouter);
app.use('/', employeeRoutes);

app.use('/api/', authRouter);
app.use('/',cartRouter)
app.use('/', province)
app.use('/', districRouter)
app.use('/', wardRouter)
app.use('/', shippingRouter)
app.use('/', locationRouter)
app.use('/', userRouter)


// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
