<template>
    <div class="cars">
      <b-card-group columns>
        <b-card v-for="car in cars" :key="car.plate"
              :title="car.plate"
              :img-src="'./img/cars/'+car.img"
              :img-alt="car.type"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2 card">
              <b-card-text>
                {{ car.info }}
              </b-card-text>
              <b-button :href="'/car?plate='+car.plate" variant="primary">További információ</b-button>
        </b-card>
      </b-card-group>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Cars',
    data () {
    return {
      cars: []
    }
  },
  created () {
    axios.get('//'+process.env.VUE_APP_SERVER_IP+'/cars').then(({ data }) => {
      this.cars = data;
    })
  }
}
</script>

<style scoped>
.cars{
  margin: auto;
  width: 80%;
}
.card{
  box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
  transition: 0.3s;
}
.card:hover{
  box-shadow: 0 16px 24px 2px rgba(17, 95, 212, 0.14),0 6px 30px 5px rgba(17, 95, 212,.12),0 8px 10px -5px rgba(17, 95, 212,.2);
}
</style>