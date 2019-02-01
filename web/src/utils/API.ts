/*********************************************
 * APIのURL等を格納する静的クラス
 **********************************************/

export default class API {
  /* ログインAPI */
  static readonly AUTH_LOGIN_URL: string = 'http://localhost:3000/api/auth/login';
  /* ユーザー登録（サインアップ）API */
  static readonly AUTH_SIGNUP_URL: string = 'http://localhost:3000/api/signup';
}