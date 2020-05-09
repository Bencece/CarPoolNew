<template>
  <div id="app">
    <b-alert :show="showError" @dismissed="showError=false" dismissible variant="danger" lazy fade class="text-center error">Nincs kapcsolat a <a v-bind:href="ip">szerverrel</a>!</b-alert>
    <Menu v-if="loggedIn"/>
    <div v-bind:class="{ content: loggedIn }">
      <router-view/>
    </div>
    <Footer v-if="loggedIn"/>
  </div>
</template>

<script>
import Menu from './components/Menu'
import Footer from './components/Footer'
import { authComputed } from './store/helpers';
import axios from '../node_modules/axios'

export default {
  data(){
    return{
      showError: false,
      ip: '//'+process.env.VUE_APP_SERVER_IP
    }
  },
  components: {
    Menu,
    Footer
  },
  computed: {
    ...authComputed
  },
  methods: {
    testServer(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/').then(() => {
        this.showError = false
      })
      .catch(()=>{
        this.showError = true
      })
    }
  },
  created(){
    this.testServer()
  }
}
</script>

<style scoped>
.content{
  margin-top: 10px;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 10px;
  width: 96%;
  border-radius: 10px 10px 10px 10px;
  background-color: white;
  /*box-shadow: 0px 0px 5px 1px black;*/
  min-height: 90vh;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
}
.error{
  z-index: 10;
}
</style>
