import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import RegisterUser from '../views/RegisterUser.vue'
import LoginUser from '../views/LoginUser.vue'
import Profile from '../views/Profile.vue'
import Cars from '../views/Cars.vue'
import Management from '../views/Management.vue'
import CarMap from '../views/Map.vue'
import Rent from '../views/Rent.vue'


Vue.use(VueRouter)

  const routes = [
  /*{
    path: '/home',
    name: 'Home',
    component: Home
  },*/
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/cars',
    name: 'cars',
    component: Cars,
    meta: { requiresAuth: true }
  },
  {
    path: '/management',
    name: 'management',
    component: Management,
    meta: { requiresAuth: true }
  },
  {
    path: '/map',
    name: 'map',
    component: CarMap,
    meta: { requiresAuth: true }
  },
  {
    path: '/rent',
    name: 'rent',
    component: Rent,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router
