<template>

  <div style="height: 500px; width: 100%">
    <!-- div style="height: 200px overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      {{ userPos }}<br>{{ counter }}<br>
    </div -->
    <b-modal id="infoModal" v-model="infoModal" hide-footer>
      <div class="d-block text-center">
        <img :src="'./img/cars/'+img" width="200">
        <h3>{{ selectedCarInfo.plate }}</h3>
      </div>
      <div class="text-center">
        <p v-if="selectedCarInfo.rentable">
          Ez az autó <b>kibérelhető</b>. A folytatáshoz kattints a "Bérlés" gombra.
        </p>
        <p v-else>
          Ez az autó jelenleg <b>nem bérelhető</b>. Kérjük válassz egy másikat!
        </p>
      </div>
      <b-button class="col-sm-6 rent" variant="success" v-if="selectedCarInfo.rentable">Bérlés</b-button>
      <b-button class="col-sm-6 float-right" @click="infoModal=false">Mégse</b-button>
    </b-modal>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker v-for="car in cars" :key="car.plate" :lat-lng="car.pos" @click="showPopup(car)">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          {{ car.plate }}
            <p v-show="showParagraph">
              Ez egy autó
            </p>
        </l-tooltip>
      </l-marker>
      <l-marker v-if="userPosSet" :lat-lng="userPos">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          Pozíciód
        </l-tooltip>
      </l-marker>
      <l-marker v-for="user in othersPos" :key="user.username" :lat-lng="user.pos">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          {{ user.username }}
        </l-tooltip>
      </l-marker>
    </l-map>
    Pozíciód lekérésének száma: {{ counter }} <br> {{ belepett }}
  </div>
</template>

<script>
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { authComputed } from '../store/helpers';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  computed: {
    ...authComputed
  },
  data() {
    return {
      zoom: 16,
      center: latLng(46.251614, 20.151247),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(46.271414, 20.149177),
      currentZoom: 11.5,
      currentCenter: latLng(46.271414, 20.149177),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      cars: [],
      userPos: '',
      userPosSet: false,
      counter: 0,
      othersPos: [],
      belepett: 0,
      selectedCarInfo: '',
      infoModal: false,
      carTypes: [],
      img: ''
    };
  },
  methods: {
    getCars(){
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/getCars').then(({ data }) => {
        data.forEach(car => {
          this.cars.push({
            plate: car.plate,
            typeID: car.typeID,
            pos: latLng(car.lastLat, car.lastLong),
            rentable: car.rentable
          })
        });
      })
      axios.get('//'+process.env.VUE_APP_SERVER_IP+'/cars').then(({ data }) => {
        this.carTypes = data;
      })
    },
    getUserPos(){
      navigator.geolocation.getCurrentPosition(pos => {
        this.userPos = latLng(pos.coords.latitude, pos.coords.longitude)
        this.userPosSet = true
      }, err => {
        console.log(err)
      });
    },
    trackPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {
          enableHighAccuracy: false,
          timeout: 40000,
          maximumAge: Infinity
        })
      } else {
        console.error("Nincs helymeghatározás!");
      }
    },
    successPosition: function(position) {
      this.userPos = latLng(position.coords.latitude, position.coords.longitude)
      this.userPosSet = true
      this.counter++
      if(this.counter == 1){
        this.center = this.userPos
      }
      /*if(this.getUser.id != 1){
        axios.post('//'+process.env.VUE_APP_SERVER_IP+'/giveUserPos',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          id: this.getUser.id
        }).then(({ data }) => {
            this.belepett++
            this.othersPos = []
            data.forEach(user => {
              this.othersPos.push({
                username: user.username,
                pos: latLng(user.lastLat, user.lastLong)
              })
              //console.log(user)
            })
        }).catch((error) => {
            console.error("Hiba: "+error)
        })
      } else {
        axios.post('//'+process.env.VUE_APP_SERVER_IP+'/getUsersPos').then(({data}) => {
          this.othersPos = []
            data.forEach(user => {
              this.othersPos.push({
                username: user.username,
                pos: latLng(user.lastLat, user.lastLong)
              })
          }).catch((error) => {
            console.error("Hiba: "+error)
          })
        })
      }*/
    },
    failurePosition: function(err) {
      //alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
      console.log('Error Code: ' + err.code + ' Error Message: ' + err.message)
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    showPopup(car){
      this.selectedCarInfo = car;
      this.img = this.carTypes.find((type) => {
          if(type.plate == this.selectedCarInfo.plate){
            return type
          }
          }).img;
      this.center = car.pos;
      this.infoModal = true;
    },
    checkQuery(){
      if(localStorage.getItem("plate")){
        this.currentCenter = this.cars.find((car) => {
          if(car.plate == localStorage.getItem("plate")){
            this.showPopup(car);
            localStorage.removeItem("plate")
            return latLng(car.lastLat, car.lastLong);
          }
        })
      }    
    }
  },
  created(){
    //this.getUserPos();
    this.trackPosition();
    this.getCars();
    //this.center = this.userPos;
  },
  updated(){
    this.checkQuery();
  }
};
</script>
<style scoped>
</style>