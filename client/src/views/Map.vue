<template>

  <div style="height: 500px; width: 100%">
    <div style="height: 200px overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
    </div>
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
      <l-marker v-for="car in cars" :key="car.plate" :lat-lng="car.pos">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          {{ car.plate }}
            <p v-show="showParagraph">
              Ez egy autó
            </p>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      zoom: 13,
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
      userPos: ''
    };
  },
  methods: {
    getCars(){
      axios.get('//localhost:3000/getCars').then(({ data }) => {
        data.forEach(car => {
          this.cars.push({
            plate: car.plate,
            typeID: car.typeID,
            pos: latLng(car.lastLat, car.lastLong)
          })
        });
      });
    },
    getUserPos(){
      navigator.geolocation.getCurrentPosition(pos => {
        this.userPos = latLng(pos.coords.latitude, pos.coords.longitude)
      }, err => {
        console.log(err)
      });
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
    }
  },
  created(){
    this.getCars();
    this.getUserPos();
  }
};
</script>
