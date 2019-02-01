import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import SignupForm from './components/signup/SignupForm.vue';
import SignupCheck from './components/signup/SignupCheck.vue';
import SignupComplete from './components/signup/SignupComplete.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      children: [
        {
          path: '',
          component: SignupForm
        },
        {
          path: 'check',
          component: SignupCheck
        },
        {
          path: 'complete',
          component: SignupComplete
        }
      ]
    }
  ]
})
