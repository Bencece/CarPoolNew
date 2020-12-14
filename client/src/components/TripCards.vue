<template>
  <div class="trip-cards">
    <span>{{ Date(parseInt(trip.TripStart)) }}</span>
    <h4>{{ trip.carPlate }}</h4>
  </div>
</template>

<script>
export default {
  name: 'TripCards',
  props: {
    trip: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>
.trip-cards {
  background-color: white;
  width: 13em;
  margin: 1em auto 1em auto;
  padding: 1em;
  border: solid 1px #2c3e50;
  cursor: pointer;
  transition: all 0.2s linear;
  border-radius: 10px 10px 10px 10px;
}
.trip-cards:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.trip-cards h4 {
  font-size: 1.4em;
  margin-top: 0.5em;
  margin-bottom: 0.3em;
}
</style>
