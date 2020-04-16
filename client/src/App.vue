<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link> 
      <div v-if="!loggedIn">
        <router-link to="/login">
          Login
        </router-link> |
        <router-link to="/register">
          Register
        </router-link>
      </div>
      <button v-else type="button" class="logoutButton" @click="logout">
        Logout
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { authComputed } from './store/helpers';

export default {
  computed: {
      ...authComputed
  },
  methods: {
    logout () {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
