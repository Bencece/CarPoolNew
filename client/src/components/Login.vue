<template>
  <div class="jumbotron">
    <h1>Bejelentkezés</h1>
    <div class="form-group">
        <label for="email">Email cím:</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Add meg az e-mail címed!" required>
    </div>
    <div class="form-group">
        <label for="password">Jelszó:</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Addj meg egy jelszót!" required>
    </div>
    <button type="submit" class="btn btn-primary" @click="register">Bejelentkezés</button>
    </div>
</template>
<script>
import auth from '@/services/authentication'
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
