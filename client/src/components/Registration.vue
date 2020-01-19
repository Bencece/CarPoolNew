<template>
  <div class="jumbotron">
    <h1>Regisztráció</h1>
    <div class="form-group">
        <label for="name">Név:</label>
        <input type="text" class="form-control" id="name" v-model="name" placeholder="Írd be a neved!" required>
    </div>
    <div class="form-group">
        <label for="email">Email cím:</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Add meg az e-mail címed!" required>
    </div>
    <div class="form-group">
        <label for="password">Jelszó:</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Addj meg egy jelszót!" required>
    </div>
    <button type="submit" class="btn btn-primary" @click="register">Regisztráció</button>
    </div>
</template>
<script>
import auth from '@/services/authentication'
const axios = require('axios');
export default {
  name: 'Registration',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
        async register(){
            var res = await auth.registration({
            name: this.name,
            email: this.email,
            password: this.password
        })
        //console.log(res);
      }
  },
  mounted() {
    
  },
}
</script>

<style scoped>

</style>
