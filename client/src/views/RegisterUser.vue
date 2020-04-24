<template>
  <div class="row regBox">
    <div class="jumbotron">
      <h1 class="title">Regisztráció</h1>
      <h6>Ha nincs fiókod itt tudsz regisztrálni. Töltsd ki a mezőket, majd kattints a regisztráció gomra.</h6>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Neved:</label>
          <input v-model="name" type="text" name="name" value class="form-control">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" name="email" value class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Jelszó:</label>
          <input v-model="password" type="password" name="password" value class="form-control">
        </div>
        <button type="submit" name="button" class="btn btn-success">Regisztráció</button>
        <br/>
        <router-link to="/" class="regLabel">Van már fiókod? Lépj be itt...</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$store
        .dispatch('register', {
          name: this.name,
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
.regBox{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
.regLabel{
  margin-top: 10px;;
}
</style>
