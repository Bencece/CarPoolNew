<template>
  <div id="dashboard">
    <div class="dashboardBox">
      <h1 id="title">Üdv a CarPool appban!</h1>
      <h4>Elintézni valód akad a városban?</h4>
      <h4 class="right">Szükséged van egy autóra?</h4>
      <h4>Foglald le az autót, menj el az úticélodra és parkolj le. Ennyi.</h4>
    </div>
        <template v-if="!isLoading">
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </template>
        <p v-else>
          Loading events
        </p>
  </div>
</template>

<script>
import axios from 'axios'
import EventCard from '../components/EventCard'

export default {
  components: { 
    EventCard
  },
  data () {
    return {
      isLoading: true,
      events: []
    }
  },
  created () {
    axios.get('//'+process.env.VUE_APP_SERVER_IP+'/dashboard').then(({ data }) => {
      this.events = data.events.events
      this.isLoading = false
    }),
    localStorage.removeItem('error')
  }
}
</script>

<style scoped>
#dashboard{
  background-image: url("../assets/vwgolf_gauss.jpg");
  background-size: contain;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top;
}
.dashboardBox{
  /*background-image: linear-gradient(#28a745, white);*/
  padding: 10px;
  color: white;
  text-shadow: 2px 2px 3px black;
}
#title{
  text-align: center;
}
.right{
  text-align: right;
}
</style>