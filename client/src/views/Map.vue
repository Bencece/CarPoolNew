<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';



export default {

  data() {
    return {
      location: null,
      carMap: null,
      view: null
    }
  },

  mounted() {
    this.initMap();
  },

  created(){
    //this.getPos();
  },

  methods: {
    initMap() {
      this.carMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({center: [46.2717795, 20.1477626], zoom: 6})
      });
    },
    getPos(){
      navigator.geolocation.getCurrentPosition(pos =>{
        this.location = pos.coords;
        console.log(pos.coords)
        //this.carMap.view.setCenter = [pos.coords.longitude, pos.coords.latitude]
        this.setMapPos();
      }, err =>{
        this.location = err;
      });
    },
    setMapPos(){
      this.view.setCenter([this.location.longitude, this.location.latitude]);
      this.carMap.setView(this.view);
    }
  }
}
</script>

<style scoped >
#map{
  width: 100%;
  height: 500px;
}
</style> 