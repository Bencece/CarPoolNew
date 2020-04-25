<template>
    <div id="nav" class="sticky-top">
      <nav class="navbar navbar-expand-sm  bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/dashboard" class="nav-link navButton"><font-awesome-icon :icon="['fas', 'bars']"/>CarPool</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/profile" class="nav-link navButton">Profilod</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/cars" class="nav-link navButton">Autóink</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/management" class="nav-link navButton">Kezelés</router-link>
          </li>
          <li class="nav-item">
            <a v-if="loggedIn" @click="logout" class="nav-link navButton" href="">Kijelentkezés</a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
import { authComputed } from '../store/helpers';

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
//https://paletton.com/#uid=14e0u0kllllaFw0g0qFqFg0w0aF
//https://paletton.com/#uid=13I0u0kllll7MuvckoLumhVDGcb
</script>

<style>
#nav{
  box-shadow: 0 4px 18px 0 rgba(0,0,0,.12),0 7px 10px -5px rgba(0,0,0,.15)
}
</style>
