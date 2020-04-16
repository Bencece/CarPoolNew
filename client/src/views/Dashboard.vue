<template>
  <div>
    <div class="row contentBox">
      <div class="col-sm-2 menuBar">
        <Menu/>
      </div>
      <div class="col-sm-10 contentBar">
        <h1>Dashboard</h1>
        <template v-if="!isLoading">
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </template>
        <p v-else>
          Loading events
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EventCard from '../components/EventCard'
import Menu from '../components/Menu'

export default {
  components: { 
    EventCard ,
    Menu
  },
  data () {
    return {
      isLoading: true,
      events: []
    }
  },
  created () {
    axios.get('//localhost:3000/dashboard').then(({ data }) => {
      this.events = data.events.events
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
.menuBar{
  background-color: #000000;
  height: 100vh;
  overflow: auto;
}
.contentBar{
  background-color: white;
}
.contentBox{
  margin-right: 0;
  margin-left: 0;
}
</style>