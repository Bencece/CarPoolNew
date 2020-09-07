<template>
    <div>
      <b-navbar id="nav" toggleable="lg" type="dark" variant="success" class="sticky-top">
        <b-navbar-brand v-if="loggedIn" to="/dashboard">CarPool</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link v-if="loggedIn" to="/profile" class="nav-link navButton">Profilod</router-link></b-nav-item>
            <b-nav-item><router-link v-if="loggedIn" to="/cars" class="nav-link navButton">Autóink</router-link></b-nav-item>
            <b-nav-item v-if="this.isAdmin"><router-link to="/management" class="nav-link navButton">Kezelés</router-link></b-nav-item>
            <b-nav-item><router-link v-if="loggedIn" to="/map" class="nav-link navButton">Térkép</router-link></b-nav-item>
            <b-nav-item><a v-if="loggedIn" @click="logout" class="nav-link navButton" href="">Kijelentkezés</a></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
import { authComputed } from '../store/helpers';

export default {
    name: 'Menu',
    data () {
    return {
      isAdmin: false
    }
  },
  computed: {
      ...authComputed
  },
  created(){
    if(this.getUser.name == "admin"){
      this.isAdmin = true;
    }
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
