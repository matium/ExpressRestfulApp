var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

// 各ルーティングで使用するルーターオブジェクト
var authRouter = require('./routes/auth');
var signupRouter = require('./routes/signup');

// DBサーバーへ接続
var mongoose = require('mongoose');
mongoose.connect('mongodb://db_user:db_password@localhost:27017/expressrestfull', { useNewUrlParser: true });

var app = express();

// クロスサイトAPIアクセスの許可
var corsOption = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

// Configure
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'cats'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  // console.log(user);
  // console.log(done);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('User Id: ' + id);
  console.log(done);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// app.use(express.static(path.join(__dirname, 'public')));


// ユーザー作成へのルート設定
app.use('/api/signup', cors(corsOption), signupRouter);
// 認証APIへのルート設定
app.use('/api/auth', cors(corsOption), authRouter);


module.exports = app;
