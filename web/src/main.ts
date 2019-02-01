import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from './store';
import router from './router';
import 'vuetify/dist/vuetify.css';
import colors from 'vuetify/es5/util/colors';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
  }
});

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
