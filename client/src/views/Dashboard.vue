<template>
  <div id="dashboard">
    <div class="dashboardBox">
      <h1 id="title">Üdv a CarPool appban!</h1>
      <h4>Elintézni valód akad a városban?</h4>
      <h4 class="right">Szükséged van egy autóra?</h4>
      <h4>Foglald le az autót, menj el az úticélodra és parkolj le. Ennyi.</h4>
    </div>
    <h3 id="title">Korábbi utazásaid:</h3>
        <template v-if="!isLoading">
          <TripCards v-for="trip in trips" :key="trip.id" :trip="trip" />
        </template>
        <p v-else>
          <b-spinner label="Utazások betöltése..." class="loadSpinner"></b-spinner>
        </p>
  </div>
</template>

<script>
import axios from 'axios'
import TripCards from '../components/TripCards'

export default {
  components: { 
    TripCards
  },
  data () {
    return {
      isLoading: true,
      trips: []
    }
  },
  created () {
    axios.post('//'+process.env.VUE_APP_SERVER_IP+'/getRentingHistory').then(({ data }) => {
      this.trips = data.trips
      this.isLoading = false
    }),
    localStorage.removeItem('error')
  }
}
</script>

<style scoped>
#dashboard{
  /*background-image: url("../assets/vwgolf_gauss.jpg");*/
  background-size: contain;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top;
}
.dashboardBox{
  /*background-image: linear-gradient(#28a745, white);*/
  padding: 10px;
  color: black;
  /*text-shadow: 2px 2px 3px black;*/
}
#title{
  text-align: center;
}
.right{
  text-align: right;
}
.loadSpinner{
  color:green;
}
</style>