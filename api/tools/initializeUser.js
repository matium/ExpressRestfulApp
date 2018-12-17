var Database = require('../models/Database');
var database = new Database();

var users = [
  {
    uid: 1,
    username: "Keita",
    password: "mr2332"
  },
  {
    uid: 2,
    username: "Kanako",
    password: "red"
  },
  {
    uid: 3,
    username: "Shiori",
    password: "yellow"
  },
  {
    uid: 4,
    username: "Ayaka",
    password: "pink"
  },
  {
    uid: 5,
    username: "Reni",
    password: "purple"
  },
];


database.connect()
  .then((db) => {
    console.log('Success Connect DB');
    // ユーザードキュメントのリストをusersテーブルにインサート
    db.collection('users').insertMany(users, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
    });
    database.close();
  })
  .catch((err) => {
    throw err;
  });