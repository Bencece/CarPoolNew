<template>
  <div id="dashboard">
        <h1>Kezdőlap</h1>
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
    })
  }
}
</script>

<style scoped>

</style>