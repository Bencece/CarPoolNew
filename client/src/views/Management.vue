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
            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
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
                      <h4>Új gyártó hozzáadása</h4>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroup-sizing-default">Gyártó neve</span>
                        </div>
                        <input v-model="manufacturer" type="text" class="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                      </div>
                    <button type="submit" class="btn btn-primary pull-right">Gyártó hozzáadása</button>
                </form>
                <hr>
                <form @submit.prevent="addCarType" type="multipart/form-data">
                      <h4>Új autótípus hozzáadása</h4>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <label class="input-group-text" for="inputGroupSelect03">Gyártó</label>
                        </div>
                        <select v-model="manufacturer_id" class="custom-select" required id="inputGroupSelect03">
                          <option selected disabled value="">Válaszd ki a gyártót...</option>
                          <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.id">
                            {{ manufacturer.name }}
                          </option>
                        </select>
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroup-sizing-default">Típus neve</span>
                        </div>
                        <input v-model="car_type_name" type="text" class="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroup-sizing-default">Fogyasztás (100km)</span>
                        </div>
                        <input v-model="consumption" type="number" step="0.1" class="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        <div class="input-group-prepend">
                          <label class="input-group-text" for="inputGroupSelect04">Mértékegység</label>
                        </div>
                        <select v-model="unit" class="custom-select" required id="inputGroupSelect04">
                          <option selected disabled value="">Válassz mértékegységet...</option>
                          <option v-for="unit in units" :key="unit.id" :value="unit.id">
                            {{ unit.short_name }}
                          </option>
                        </select>
                        <div class="input-group-prepend">
                          <label class="input-group-text" for="inputGroupSelect05">Üzemanyag</label>
                        </div>
                        <select v-model="fuel" class="custom-select" required id="inputGroupSelect05">
                          <option selected disabled value="">Válassz üzemanyagot...</option>
                          <option v-for="fuel in fuels" :key="fuel.fuelID" :value="fuel.fuelID">
                            {{ fuel.type }}
                          </option>
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <b-form-textarea id="textarea" v-model="text" placeholder="Leírás..." rows="3" max-rows="10"></b-form-textarea>
                      </div>
                      <div class="input-group mb-3">
                        <b-form-file v-model="picture" :state="Boolean(picture)" accept=".jpg" placeholder="Válassz ki vagy húzz ide egy képet..." drop-placeholder="Húzd ide a képet..." browse-text="Tallózás..."></b-form-file>
                      </div>
                    <button type="submit" class="btn btn-primary pull-right">Autótípus hozzáadása</button>
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
      fuels: [],
      units: [],
      message: '',
      error: 'Hiba a kérés feldolgozásakor!',
      plate: null,
      type: '',
      rm_plate: '',
      manufacturer: '',
      car_type_name: '', 
      consumption: '',
      fuel: '',
      picture: null,
      manufacturer_id: '',
      unit: '',
      text: '',
      showMessage: false,
      showError: false
    }
  },
  methods: {
    getCars(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/getCars').then(({ data }) => {
        this.cars = data
      })
    },
    getCarTypes(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/getCarTypes').then(({ data }) => {
        this.car_types = data
      })
    },
    getManufacturers(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/getManufacturers').then(({ data }) => {
        this.manufacturers = data
      })
    },
    getFuelTypes(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/getFuelTypes').then(({ data }) => {
        this.fuels = data
      })
    },
    getUnits(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/getUnits').then(({ data }) => {
        this.units = data
      })
    },
    addCar() {
      axios.post('//'+process.env.VUE_APP_SERVER_IP+'/addCar',{
        plate: this.plate,
        typeID: this.type
      }).then(({ data }) => {
        this.message = data,
        this.showMessage = true,
        this.plate = '',
        this.type = '',
        this.getCars(),
        this.getCarTypes()
      }).catch(() => {
        this.showError = true,
        this.plate = '',
        this.type = ''
      });
    },
    removeCar() {
      axios.post('//'+process.env.VUE_APP_SERVER_IP+'/removeCar',{
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
      axios.post('//'+process.env.VUE_APP_SERVER_IP+'/addManufacturer',{
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
    },
    addCarType(){
      let formData = new FormData();
      formData.append('file', this.picture);
      var carType = {
        manufacturerID: this.manufacturer_id,
        type: this.car_type_name,
        consumption: this.consumption,
        consumption_unitID: this.unit,
        fuelID: this.fuel,
        info: this.text
      }
      for (var data in carType){
        formData.append(data, carType[data]);
      }
      axios.post('//'+process.env.VUE_APP_SERVER_IP+'/addCarType', formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({ data }) => {
        this.message = data,
        this.showMessage = true,
        this.manufacturer_id = '',
        this.car_type_name = '',
        this.consumption = '',
        this.unit = '',
        this.fuel = '',
        this.text = '',
        this.picture = null
      }).catch(() => {
        this.showError = true,
        this.manufacturer_id = '',
        this.car_type_name = '',
        this.consumption = '',
        this.unit = '',
        this.fuel = '',
        this.text = '',
        this.picture = null
      });
    }
  },
  created () {
    this.getCarTypes(),
    this.getCars(),
    this.getManufacturers(),
    this.getUnits(),
    this.getFuelTypes()

  }
}
</script>

<style scoped>
</style>