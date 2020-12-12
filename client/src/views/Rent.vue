<template>
  <div class="box">
    <h3 id="info" v-if="reserved">
      Foglalásod hamarosan lejár, kérlek indítsd el a bérlést!
      <br>
      <span class="badge badge-warning">{{ timer }} perc</span>
    </h3>
    <h3 id="info" v-else>Foglalásod lejárt!<br>Válassz egy autót a térképen!</h3>
    <b-button class="col-sm-6" variant="primary" :disabled="!reserved">
      <span v-if="reserved">Induljunk!</span>
      <span v-else>A foglalás lejárt</span>
    </b-button>
    <b-button class="col-sm-6" variant="danger" v-if="reserved">Foglalás törlése</b-button>
  </div>
</template>

<script>
//import axios from 'axios';

export default {
  
  data () {
    return {
      timer: "0:0",
      reserved: false
    }
  },
  methods:{
    counterFunction(countDownDate){
      var countBack = setInterval(()=>{
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        console.log(minutes+":"+seconds)
        this.timer=minutes+":"+seconds;
        if (distance <= 0) {
          console.log("leáll")
          clearInterval(countBack);
          this.reserved=false;
          localStorage.removeItem("startDate");
          this.timer="0:0"
        }
      }, 1000);
    }
  },
  created(){
    /*axios.post('//'+process.env.VUE_APP_SERVER_IP+'/reserveCar', { plate: car.plate }).then(({ data }) => {
      if(data.reserved){
        this.$router.push({ path: '/rent'})
      }
    })*/
    if(localStorage.getItem("startDate")){
      this.reserved=true;
      this.counterFunction(parseInt(localStorage.getItem("startDate"))+30000);
    }
  }
}
</script>

<style scoped>
.box{
  margin-top: 10px;
}
#info{
  text-align: center;
}
</style>