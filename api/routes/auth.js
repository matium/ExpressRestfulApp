var express = require('express');
var router = express.Router();
var login = require('../models/login');

router.get('/', (req, res, next) => {
  res.send('<p>This is Auth API</p>');
});

router.post('/', (req, res, next) => {
  login(req.body.username, req.body.password)
    .then((result) => {
      // console.log('Post Success');
      if (result.verified) {
        console.log('User Auth Success');
        res.jsonp(result);
      }
      else {
        console.log('User Auth Failed');
        res.jsonp(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

module.exports = router;