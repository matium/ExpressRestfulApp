var Database = require('./Database');
var database = new Database();

async function login(username, password) {
  try {
    await database.connect();
    // console.log('Connect');
    const userdata = await database.getUser(username);
    // console.log('Find User');
    const isVerified = userdata.password === password;
    database.close();
    // レスポンス用ユーザーデータを作成
    const responseData = {
      verified: isVerified,
      uid: userdata.uid,
      username: userdata.username
    };
    return responseData;
  }
  catch(err) {
    database.close();
    throw err;
  }
}

module.exports = login;