var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('../models/user');


passport.use(new LocalStrategy((username, password, callback) => {
  User.findOne({ username: username }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return callback(err);
    }

    if (!result) {
      console.log('ユーザーIDの間違い');
      return callback(null, false, { message: 'ユーザーIDが間違っています。' });
    }

    // ハッシュ化されたパスワードと渡されたパスワードを比較する
    bcrypt.compare(password, result.password, (err, res) => {

      // エラーが出力されたときはエラーとして処理
      if (err) {
        console.log(err);
        console.log('パスワードの間違い');
        return callback(null, false, { message: 'パスワードが間違っています'});
      }

      if (!res) {
        console.log('パスワードの間違い');
        return callback(null, false, { message: 'パスワードが間違っています'});
      }

      // エラーでなければ認証OK
      return callback(null, result);
    });
  });
}));


router.get('/', (req, res, next) => {
  res.send('<p>This is Auth API</p>');
});


router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.user) {
    console.log('ユーザー認証OK');
    res.send({
      verified: true,
      uid: req.user.uid,
      username: req.user.username
    });
  }
});


module.exports = router;