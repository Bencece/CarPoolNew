<template>
  <div class="regBox">
    <div class="jumbotron">
      <h1 class="title">Regisztráció</h1>
      <h6>Ha nincs fiókod itt tudsz regisztrálni. Töltsd ki a mezőket, majd kattints a regisztráció gomra.</h6>
      <p id="err">{{ errorMsg }}</p>
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
          <input v-model="password" @change="testPassword" type="password" name="password" value class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Jelszó mégegyszer:</label>
          <input v-model="password2" @change="testPassword" type="password" name="password2" value class="form-control">
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
      password: '',
      password2: '',
      errorMsg: ''
    }
  },
  methods: {
    register () {
      if (this.testPassword() && this.name!='' && this.email!=''){
        this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(() => {
          this.errorMsg = "A regisztráció nem sikerült! Ezzel a felhasználónévvel, vagy email címmel már regisztrált valaki.";
          this.name= '';
          this.email= '';
        })
      } 
    },
    testPassword(){
      if (!this.testRegx(this.password)) {
        this.errorMsg = "A jelszónak tartalmazia kell legalább egy számot, egy kisbetűt, egy nagybetűt és minimum 8 karakter hosszúnak kell lennie!";
        return false;
      } else if (this.password != this.password2){
        this.errorMsg = "A jelszavak nem egyeznek meg!";
        return false;
      }
      this.errorMsg = "";
      return true;
    },
    testRegx(password){
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return regex.exec(password);
    }
  }
}
</script>

<style>
.regBox{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
.regLabel{
  margin-top: 10px;;
}
#err{
  color: red;
}
@media only screen and (max-width: 576px) {
  .regBox{
    top: 65%;
    width: 90%;
  }
}
</style>
