<template>
  <div class="loginBox">
    <b-modal>Nem megfelelő felhasználónév vagy jelszó!</b-modal>
    <div class="jumbotron">
      <h1 class="title">Üdvözlünk!</h1>
      <p id="err">{{ errorMsg }}</p>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" name="email" value class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Jelszó:</label>
          <input v-model="password" type="password" name="password" value class="form-control" required>
        </div>
        <button name="button" class="btn btn-success">Bejelentkezés</button>
        <br/>
        <router-link to="/register" class="regLabel">Nincs fiókod? Regisztrálj itt...</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { authComputed } from '../store/helpers';

export default {
  data () {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
    login () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(() => {
          localStorage.setItem('error', "Hibás felhasználónév vagy jelszó!")
        })
    }
  },
  created(){
    this.errorMsg = localStorage.getItem("error")
  }
}
</script>

<style scoped>
.loginBox{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
.regLabel{
  margin-top: 10px;
}
#err{
  color: red;
}
</style>
