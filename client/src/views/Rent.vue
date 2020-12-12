<template>
  <div>
    <div class="box" v-if="!trip">
      <h3 id="info" v-if="reserved">
        Foglalásod hamarosan lejár, kérlek indítsd el a bérlést!
        <br>
        <span class="badge badge-warning">{{ timer }} perc</span>
      </h3>
      <div v-if="carInfo" class="carInfo">
        <h3>{{ car.plate }}</h3>
        <img :src="'./img/cars/'+car.img" alt="car" width="200">
      </div>
      <h3 id="info" v-else>Foglalásod lejárt!<br>Válassz egy autót a térképen!</h3>
      <b-button class="col-sm-6 col-md-12" :variant="reserved ? 'primary' : 'info'" @click="rentCar()">
        <span v-if="reserved">Induljunk!</span>
        <span v-else>Irány a térkép!</span>
      </b-button>
      <b-button class="col-sm-6 col-md-12" variant="danger" v-if="reserved" @click="stopReservation()">Mégse</b-button>
      {{ info }}
    </div>
    <div class="box" v-if="trip">
      <div v-if="carInfo" class="carInfo">
        <h3>{{ car.plate }}</h3>
        <img :src="'./img/cars/'+car.img" alt="car" width="200">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

var countBack;

export default {
  
  data () {
    return {
      timer: "0:0",
      reserved: false,
      info: "",
      car: null,
      carInfo: false,
      trip: false,
      tripStart: ""
    }
  },
  methods:{
    counterFunction(countDownDate){
      countBack = setInterval(()=>{
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.timer=minutes+":"+seconds;
        if (distance <= 0) {
          this.info=""
          clearInterval(countBack);
          this.reserved=false;
          this.carInfo=false;
          localStorage.removeItem("startDate");
          this.timer="0:0"
        }
      }, 1000);
    },
    rentCar(){
      if(this.reserved){
        axios.post('//'+process.env.VUE_APP_SERVER_IP+'/startRenting').then(({ data }) => { 
          localStorage.removeItem("startDate");
          this.trip = data.trip;
          this.tripStart = data.tripStart;
        })
      }else{
        this.$router.push({ path: '/map'})
      }
    },
    stopReservation(){
      axios.post('//'+process.env.VUE_APP_SERVER_IP+'/stopReservation',{ plate: this.car.plate }).then(() => {
        clearInterval(countBack);
        this.info=""
        this.reserved=false;
        this.carInfo=false;
        localStorage.removeItem("startDate");
        this.timer="0:0"
        this.$router.push({ path: '/map'})
      })
    }
  },
  created(){
    axios.post('//'+process.env.VUE_APP_SERVER_IP+'/getReservedCar').then(({ data }) => {
      if(data[0].plate){
        this.car={
          plate: data[0].plate,
          img: data[0].img,
          reservationStarted: data[0].reservationStarted
        }
        this.carInfo=true
      }
    })
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
.carInfo{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  box-shadow: 0 10px 10px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px 10px 10px 10px;
}
</style>