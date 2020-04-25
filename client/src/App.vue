<template>
  <div id="app">
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

export default {
  components: {
    Menu,
    Footer
  },
  computed: {
    ...authComputed
  },
  methods: {
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
</style>
