<template>
    <div class="row">
        <div class="col-sm-3" id="sidenav">
            <div>
                USER
            </div>
            <div class="btn-group-vertical">
                <button type="button" class="btn btn-primary">Adataim</button>
                <button type="button" class="btn btn-primary">Foglalásaim</button>
                <button type="button" class="btn btn-primary">Kijelentkezés</button>
            </div>
        </div>
        <div class="col-sm-9" id="content">Utazások, autók</div>
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
.row{
    height: 100vh;
}
#sidenav{
    background-color: aliceblue;
}
#content{
    background-color: lightblue;
}
#buttons{
    align-items: center;
}
</style>
