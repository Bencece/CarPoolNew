import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
//import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '../node_modules/axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  components: { App },
  created () {
    const userString = localStorage.getItem('user') // grab user data from local storage
    if (userString) { // check to see if there is indeed a user
      const userData = JSON.parse(userString) // parse user data into JSON
      this.$store.commit('SET_USER_DATA', userData) // restore user data with Vuex
    }
    axios.interceptors.response.use(
      response => response, // simply return the response 
      error => {
          if (error.response.status === 401) { // if we catch a 401 error
          this.$store.dispatch('logout') // force a log out 
      }
      return Promise.reject(error) // reject the Promise, with the error as the reason
        }
    )
  },
  render: h => h(App)
}).$mount('#app')
