<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link> 
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
