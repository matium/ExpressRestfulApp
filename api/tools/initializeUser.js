var bcrypt = require('bcrypt');
var User = require('../models/user');

// DBサーバーへ接続
var mongoose = require('mongoose');
mongoose.connect('mongodb://db_user:db_password@localhost:27017/expressrestfull', { useNewUrlParser: true });

var users = [
  {
    uid: 1,
    username: "Keita",
    email: "keita@matium.jp",
    password: "mr2332"
  },
  {
    uid: 2,
    username: "Kanako",
    email: "kanako@momoclo.net",
    password: "red"
  },
  {
    uid: 3,
    username: "Shiori",
    email: "shiori@momoclo.net",
    password: "yellow"
  },
  {
    uid: 4,
    username: "Ayaka",
    email: "ayaka@momoclo.net",
    password: "pink"
  },
  {
    uid: 5,
    username: "Reni",
    email: "reni@momoclo.net",
    password: "purple"
  },
];

for (let i in users) {
  const hashPass = bcrypt.hashSync(users[i].password, 10);
  users[i].password = hashPass;
}

User.insertMany(users, (err, result) => {
  if (err) {
    throw err;
  }
  console.log(result);
});

