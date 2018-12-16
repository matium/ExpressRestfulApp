import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    loginUser ({ commit, state }, userInfo) {
      console.log('Login User Action ------------------');
      console.log('user: ' + userInfo.username);
      console.log('password: ' + userInfo.password);
      // ここでAPIへ認証チェック
    }
  }
})
