<template>
  <div class="row loginBox">
    <div class="col-sm-4"></div>
    <div class="jumbotron col-sm-4">
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
    <div class="col-sm-4"></div>
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

<style>
.loginBox{
  margin-top: 10%;
  margin-right: 0;
margin-left: 0;
}
.regLabel{
  margin-top: 10px;;
}
</style>
