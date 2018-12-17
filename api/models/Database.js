var MongoClient = require('mongodb').MongoClient;
var config = require('../db-config');

/**
 * データベースクラス
 * データベースの操作を行う
 * @constructor
 */
var Database = function() {
  /* データベースへのアクセスアカウント */
  this.dbAuth = config.dbAuth;

  /* データベースの名前 */
  this.dbName = config.dbName;

  /* データベースへの接続URL */
  this.dbUrl = 'mongodb://'
  + config.dbAuth.user + ':'
  + config.dbAuth.password + '@'
  + config.dbHost + '/'
  + config.dbName;

  /* データベースの接続クライアントオブジェクト */
  this.client = null;

  /* データベースオブジェクト */
  this.db = null;
};

/**
 * データベースへの接続
 * 接続の成功時にはdbオブジェクトを返す
 * 接続失敗時はErrorオブジェクトをthrow
 * @returns {Promise<void>}
 */
Database.prototype.connect = async function() {
  if (!this.db) {
    // 接続URLの作成
    console.log('DB URL: ' + this.dbUrl);
    this.client = new MongoClient(this.dbUrl, { useNewUrlParser: true });
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      return this.db;
    }
    catch(err) {
      throw err;
    }
  }
  else {
    console.log('Database Item already exists.');
    return this.db;
  }
};

/**
 * ユーザー名からユーザーデータを取得する
 */
Database.prototype.getUser = async function(username) {
  if (!this.db) {
    const connectError = new Error('DB Client is not connect. Please call connect() method.');
    connectError.name = 'DbConnectError';
    throw connectError;
  }
  try {
    let result = await this.db.collection('users').findOne({username: username});
    if (!result) {
      const notFoundError = new Error('User is not found.');
      notFoundError.name = 'NotFound';
      throw notFoundError;
    }
    return result;
  }
  catch(err) {
    throw err;
  }
};



/**
 * データベースの接続を閉じる
 */
Database.prototype.close = function() {
  if (this.client) {
    this.client.close();
    delete this.db;
    delete this.client;
    console.log('DB Closed');
  }
};


/**
 * データベースクラス
 * @type {Database}
 */
module.exports = Database;