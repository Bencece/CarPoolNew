<template>
  <div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">
          Email:
        </label>
        <input v-model="email" type="email" name="email" value class="form-control">
      </div>
      <div class="form-group">
        <label for="password">
          Password:
        </label>
        <input v-model="password" type="password" name="password" value class="form-control">
      </div>
      <button type="submit" name="button">
        Login
      </button>
      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
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
</style>
