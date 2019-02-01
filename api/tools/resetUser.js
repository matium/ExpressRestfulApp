var bcrypt = require('bcrypt');
var User = require('../models/user');
var UserCounter = require('../models/userCounter');

var mongoose = require('mongoose');
mongoose.connect('mongodb://db_user:db_password@localhost:27017/expressrestfull', { useNewUrlParser: true });

UserCounter.findOneAndUpdate({ id: 'user_id' }, {$set: { seq: 0 }}, { new: true }, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('Reset UserCounter Collection');
  console.log(result);
});

User.deleteMany({ uid: {$exists: true }}, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('Remove All User');
  console.log(result);
});

