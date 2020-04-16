<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link> 
      <div v-if="!loggedIn">
        <router-link to="/">
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

</style>
