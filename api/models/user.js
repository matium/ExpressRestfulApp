var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  uid: { type: Number, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

module.exports = mongoose.model('user', User);