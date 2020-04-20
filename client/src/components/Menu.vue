<template>
    <div id="nav">
      <nav class="navbar nav1">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/dashboard" class="nav-link navButton">CarPool</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/profile" class="nav-link navButton">Profilod</router-link>
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
  position: absolute;
  left: 0;
  right: 0;
}
.navbar{
  /*background-color: #0E2A5F;*/
  background-image: linear-gradient(rgb(29, 96, 221), #0E2A5F);
  height: 100vh;
}
.navbar-nav{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
ul {
  /*background-color: rgb(29, 96, 221);*/
}
.navButton{
  /*background-color: rgb(29, 96, 221);*/
  color: white;
  padding-left: 20px !important;
  padding-bottom: 20px !important;
  margin-bottom: 6%;
  /*margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px 10px 10px 10px;*/
  font-weight: bold;
}
.navButton:hover {
  background-color: rgb(29, 96, 221);
  color: white;
  padding-left: 20px !important;  
  padding-bottom: 20px;
  box-shadow: black 5px 5px 10px;
}
</style>
