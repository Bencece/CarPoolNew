<template>
    <div class="cars">
        <ul>
            <li v-for="car in cars" :key="car">
                {{ car.plate }}
                <img :alt="car.type" :src="'./img/cars/'+car.img">
            </li>
        </ul>
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
    axios.get('//localhost:3000/cars').then(({ data }) => {
      this.cars = data;
    })
  }
}
</script>

<style scoped>
.cars{
    background-color: white;
}
.cars img{
    width: 200px;
}
</style>