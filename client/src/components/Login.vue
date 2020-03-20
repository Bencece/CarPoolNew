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
    <button type="submit" class="btn btn-primary" @click="login">Bejelentkezés</button>
    <br/>
    <router-link :to="{ path: '/registration' }">Regisztrálj itt</router-link>
    </div>
</template>
<script>
/* eslint-disable */
import auth from '@/services/authentication';
import router from '../router/index';
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
          async login(){
            var res = await auth.login({
            email: this.email,
            password: this.password
        }).then(function(response){
          if(response.data.message){
            router.push('/home');
          }else{
            console.log(response);
          }
        })
      }
  }
}
</script>

<style scoped>

</style>
