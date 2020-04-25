<template>
    <div>
      <b-alert :show="showMessage" @dismissed="showMessage=false" dismissible variant="success" lazy fade>{{ this.message.text }}</b-alert>
      <b-alert :show="showError" @dismissed="showError=false" dismissible variant="danger" lazy fade>{{ this.error }}</b-alert>
      <template>
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" class="text-left" v-b-toggle.accordion-1 variant="light">Új autó hozzáadás</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <form @submit.prevent="addCar">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">Rendszám</span>
                    </div>
                    <input v-model="plate" type="text" class="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Típus</label>
                    </div>
                    <select v-model="type" class="custom-select" required id="inputGroupSelect01">
                      <option selected disabled value="">Válassz típust...</option>
                      <option v-for="car_type in car_types" :key="car_type.id" :value="car_type.id">
                        {{ car_type.name }} {{ car_type.type }}
                      </option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary pull-right">Autó hozzáadása</button>
                </form>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" class="text-left" v-b-toggle.accordion-2 variant="light">Autó eltávolítása</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <form @submit.prevent="removeCar">
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect02">Autóink</label>
                      </div>
                      <select v-model="rm_plate" class="custom-select" required id="inputGroupSelect02">
                        <option selected disabled value="">Válaszd ki a rendszámot...</option>
                        <option v-for="car in cars" :key="car.plate" :value="car.plate">
                          {{ car.plate }}
                        </option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-danger pull-right">Autó eltávolítása</button>
                </form>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" class="text-left" v-b-toggle.accordion-3 variant="light">Autótípusok kezelése</b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <form @submit.prevent="addManufacturer">
                      <h4>Gyártó hozzáadása</h4>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroup-sizing-default">Új gyártó hozzáadása</span>
                        </div>
                        <input v-model="manufacturer" type="text" class="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                      </div>
                    <button type="submit" class="btn btn-primary pull-right">Gyártó hozzáadása</button>
                </form>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </template>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Management',
    data () {
    return {
      car_types: [],
      cars: [],
      manufacturers: [],
      message: '',
      error: 'Hiba a kérés feldolgozásakor!',
      plate: '',
      type: '',
      rm_plate: '',
      manufacturer: '',
      showMessage: false,
      showError: false
    }
  },
  methods: {
    getCars(){
      axios.get('//localhost:3000/getCars').then(({ data }) => {
        this.cars = data
      })
    },
    getCarTypes(){
      axios.get('//localhost:3000/getCarTypes').then(({ data }) => {
        this.car_types = data
      })
    },
    getManufacturers(){
      axios.get('//localhost:3000/getManufacturers').then(({ data }) => {
        this.manufacturers = data
      })
    },
    addCar() {
      axios.post('//localhost:3000/addCar',{
        plate: this.plate,
        typeID: this.type
      }).then(({ data }) => {
        this.message = data,
        this.showMessage = true,
        this.plate = '',
        this.type = '',
        this.getCars()
      }).catch(() => {
        this.showError = true,
        this.plate = '',
        this.type = ''
      });
    },
    removeCar() {
      axios.post('//localhost:3000/removeCar',{
        plate: this.rm_plate
      }).then(({ data }) => {
        this.message = data,
        this.showMessage = true,
        this.rm_plate = '',
        this.getCars()
      }).catch(() => {
        this.showError = true,
        this.rm_plate = ''
      });
    },
    addManufacturer(){
      axios.post('//localhost:3000/addManufacturer',{
        manufacturer: this.manufacturer
      }).then(({ data }) => {
        this.message = data,
        this.showMessage = true,
        this.manufacturer = '',
        this.getManufacturers()
      }).catch(() => {
        this.showError = true,
        this.manufacturer = ''
      });
    }
  },
  created () {
    this.getCarTypes(),
    this.getCars()
  }
}
</script>

<style scoped>
</style>