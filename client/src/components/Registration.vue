<template>
  <div class="jumbotron">
    <h1>Regisztráció</h1>
    <div class="form-group">
        <label for="email">Email cím:</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Add meg az e-mail címed!">
    </div>
    <div class="form-group">
        <label for="password">Jelszó:</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Addj meg egy jelszót!">
    </div>
    <button type="submit" class="btn btn-primary" @click="register">Regisztráció</button>
    </div>
</template>

<script>
import auth from '@/services/authentication'
export default {
name: 'Registration',
  data () {
    return {
      email : '',
      password: ''
    }
  },
  methods: {
        async register(){
            var res = await auth.registration({
            email: this.email,
            password: this.password
        })
        console.log(res);
      }
  },
}
</script>

<style scoped>

</style>
