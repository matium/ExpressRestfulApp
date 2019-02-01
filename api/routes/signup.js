var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var UserCounter = require('../models/userCounter');


router.post('', (req, res) => {
  console.log('Post Regist User');

  UserCounter.findOneAndUpdate({ id: 'user_id' }, {$inc: { seq: 1 }}, { new: true }, (err, result) => {
    if (err) {
      // ここにエラーレスポンス
      res.status(500).send(err);
      throw err;
    }

    if (!result) {
      // ここにエラーレスポンス
      res.status(500).send('Error Missing User Counter');
      return;
    }

    // ユーザーIDをインクリメントされたユーザー番号を設定
    const uid = result.seq;
    // パスワードをハッシュ化
    const hashPass = bcrypt.hashSync(req.body.password, 10);
    // 登録ユーザーのDB登録
    User.create({
      uid: uid,
      username: req.body.username,
      email: req.body.email,
      password: hashPass
    }, (err, result) => {
      if (err) {
        res.status(500).send(err);
        throw err;
      }
      console.log('User Registed');

      // レスポンスを返す
      res.jsonp({
        uid: result.uid,
        username: result.username,
        email: result.email
      });
    });
  });
});


module.exports = router;
