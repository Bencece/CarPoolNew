<template>
  <div class="loginBox">
    <div class="jumbotron">
      <h1 class="title">Üdvözlünk!</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" name="email" value class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Jelszó:</label>
          <input v-model="password" type="password" name="password" value class="form-control">
        </div>
        <button type="submit" name="button" class="btn btn-success">Bejelentkezés</button>
        <br/>
        <router-link to="/register" class="regLabel">Nincs fiókod? Regisztrálj itt...</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
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
    }
  }
}
</script>

<style scoped>
.loginBox{
  top: 30%;
  position: relative;
  margin: auto;
  width: 40%;
}
.regLabel{
  margin-top: 10px;
}
</style>
