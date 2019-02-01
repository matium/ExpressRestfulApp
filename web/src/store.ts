import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API from './utils/API';
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {
      uid: '',
      name: ''
    },
    preSignupUser: {
      username: '',
      email: '',
      password: ''
    }
  },
  mutations: {
    /**
     * ユーザーを設定
     * @param state
     * @param payload
     */
    setUser (state, payload): void {
      state.loggedIn = true;
      state.user.uid = payload.user_id;
      state.user.name = payload.user_name;
      
    },
  
    /**
     * 新規ユーザーのユーザー情報を仮セットする（※実際の登録はされない）
     * @param state
     * @param payload
     */
    setSignupUser (state, payload): void {
      state.preSignupUser.username = payload.username;
      state.preSignupUser.email = payload.email;
      state.preSignupUser.password = payload.password;
      router.push('/signup/check')
    },
  
    /**
     * 仮ユーザーデータをクリアする
     * @param state
     */
    clearSignupUser (state): void {
      state.preSignupUser.username = '';
      state.preSignupUser.email = '';
      state.preSignupUser.password = '';
    }
  },
  actions: {
    /**
     * ログイン認証：認証後はloggedInとユーザーのstateを更新する
     * @param commit
     * @param state
     * @param userInfo
     */
    loginUser ({ commit }, userInfo) {
      console.log('Login User Action ------------------');
      console.log('user: ' + userInfo.username);
      console.log('password: ' + userInfo.password);
      // ここでAPIへ認証チェック
      axios.post(API.AUTH_LOGIN_URL, {
        username: encodeURIComponent(userInfo.username),
        password: encodeURIComponent(userInfo.password)
      })
      .then((res: any) => {
        const data = res.data;
        console.log(res.data);
        commit('setUser', { user_id: data.uid, user_name: data.username });
      })
      .catch((err: Error) => {
        console.log(err);
      });
    },
  
    /**
     * ユーザー登録：
     * @param commit
     * @param state
     */
    registUser({ commit, state }) {
      console.log('Register User Action ------------------');
      console.log('user: ' + state.preSignupUser.username);
      console.log('email: ' + state.preSignupUser.email);
      console.log('password: ' + state.preSignupUser.password);
      // ここでAPIへユーザー登録
      axios.post(API.AUTH_SIGNUP_URL, {
        username: encodeURIComponent(state.preSignupUser.username),
        email: encodeURIComponent(state.preSignupUser.email),
        password: encodeURIComponent(state.preSignupUser.password)
      })
      .then((res: any) => {
        const data = res.data;
        // 登録が完了したら、完了画面へ遷移
        router.push('/signup/complete');
      })
      .catch((err: Error) => {
        console.log(err);
      });
    }
  }
})
