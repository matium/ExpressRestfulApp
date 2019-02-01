var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserCounter = new Schema({
  id: { type: String, require: true },
  seq: { type: Number, require: true }
});

module.exports = mongoose.model('userCounter', UserCounter, 'userCounter');