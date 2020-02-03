<template>
    <div class="row" id="box">
        <div class="col-sm-3" id="sidenav">
            <div>
                <img src="../assets/user.png" width="20%"/><br/>
                USER
            </div>
            <div class="btn-group-vertical">
                <button type="button" class="btn btn-primary">Adataim</button>
                <button type="button" class="btn btn-primary">Foglalásaim</button>
                <button type="button" class="btn btn-primary">Kijelentkezés</button>
            </div>
        </div>
        <div class="col-sm-9" id="content">
            <div>
                Utazások, autók
            </div>
            <div class="doboz row">
                <div class="col-sm-3">
                    <img src="../assets/car.png" width="130px"/>
                </div>
                <div class="col-sm-9">
                    <p>Ez egy autó lesz<br/>
                    Ez egy nagyon tuti autó. És itt vannak az adatai...</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Home',
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

<style>
#box{
    height: 100vh;
}
#sidenav{
    background-color: aliceblue;
    padding-top: 10px;
}
#content{
    background-color: lightblue;
}
#buttons{
    align-items: center;
}
.doboz{
    background-color: lightgray;
    border-radius: 10px 10px 10px 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>
