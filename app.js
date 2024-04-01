var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由
var indexRouter = require('./routes/web/index');
var webRouter = require('./routes/api/index');
const authRouter = require('./routes/web/auth');
var app = express();

// 引入 express-session connect-mongo
const session = require('express-session');
const MongoStore = require('connect-mongo');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 导入配置项
const { DBHOST, DBNAME, DBPORT } = require('./config/config')

// session 中间件
app.use(session({
  name: 'sid', // 设置 cookie 的name ，默认值是 connect.sid
  secret: 'accountCAS', // 参与加密的字符串（又称签名） 加严
  saveUninitialized: false, // 是否每次请求都设置一个cookie来存储session的id
  resave: true, // 是否每次请求重新保存session
  store: MongoStore.create({ // 数据库配置连接
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作
    maxAge: 1000 * 60 * 60 * 24 // 设置sessionID过期时间
  }
}))


// 使用路由
app.use('/', indexRouter);
app.use('/api', webRouter)
app.use('', authRouter)

// 响应404
app.use(function (req, res, next) {
  res.render('404')
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
