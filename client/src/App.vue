<template>
  <div id="app">
    <div v-bind:class="{ row : loggedIn, 'contentBox': loggedIn }">
      <div v-bind:class="{ manuBar: loggedIn , 'col-sm-2' : loggedIn}">
        <Menu v-if="loggedIn"/>
      </div>
      <div v-bind:class="{ contentBar: loggedIn , 'col-sm-10' : loggedIn}">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu'
import { authComputed } from './store/helpers';

export default {
  components: {
    Menu
  },
  computed: {
    ...authComputed
  },
  methods: {
  }
}
</script>

<style>

.menuBar{
  background-color: #000000;
  height: 100vh;
  overflow: auto;
}
.contentBar{
  background-color: white;
}
.contentBox{
  margin-right: 0;
  margin-left: 0;
}
</style>
