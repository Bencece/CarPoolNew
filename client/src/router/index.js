/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
