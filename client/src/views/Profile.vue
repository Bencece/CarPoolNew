<template>
  <div class="profile">
    <h1>Profilod</h1>
    <h2>Üdv a profilodban {{ getUser.name }}!</h2>
    <div class="settingsBox">
      <b-form @submit.prevent="saveUserData" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-name"
          label="Kérjük add meg a teljes neved:"
          label-for="input-name"
        >
          <b-form-input
            id="input-name"
            v-model="form.name"
            required
            placeholder="név"
            :disabled="editable"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-address"
          label="Kérjük add meg a lakcímed:"
          label-for="input-adress"
        >
          <div class="postalRow">
            <b-form-input
              id="input-postal"
              v-model="form.postal"
              type="number"
              min="1000"
              max="9999"
              required
              placeholder="irányítószám"
              class="col-sm-4"
            :disabled="editable"
            ></b-form-input>
            <b-form-input
              id="input-city"
              v-model="form.city"
              required
              placeholder="település"
              class="col-sm-8"
            :disabled="editable"
            ></b-form-input>
          </div>
            <b-form-input
              id="input-place"
              v-model="form.place"
              required
              placeholder="utca, házszám, emelet, ajtó"
            :disabled="editable"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-license">
            <b-form-checkbox 
            v-model="form.license" 
            id="checkboxes-license" 
            value="true"
            required
            :disabled="editable"
            >
              Rendelkezem érvényes személygépjármű vezetéséhez szükséges jogosítvánnyal.
              </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="editable" >Mentés</b-button>
        <b-button type="reset" variant="danger" :disabled="editable">Mezők törlése</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers";
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: "",
        postal: "",
        city: "",
        place: "",
        license: "",
      },
      show: true,
      editable: false,
    };
  },
  computed: {
    ...authComputed,
  },
  created(){
    this.getUserData()
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.name = "";
      this.form.postal = "";
      this.form.city = "";
      this.form.place = "";
      this.form.license = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getUserData(){
      axios.post('//'+process.env.VUE_APP_SERVER_IP+'/getUserData').then(({ data }) => {
        console.log(data)
        if (data.length>0){
          this.form.name = data[0].name;
          this.form.postal = data[0].postal_code;
          this.form.city = data[0].city;
          this.form.place = data[0].place;
          if(data[0].license){
            this.form.license = true;
          } else this.form.license = false;
          this.editable = true;
        }
      })
    },
    saveUserData(){
      if(this.form.name !="" && this.form.postal !="" && this.form.city !="" && this.form.place !=""){
        axios.post('//'+process.env.VUE_APP_SERVER_IP+'/saveUserData',{
          name : this.form.name,
          postal : this.form.postal,
          city : this.form.city,
          place : this.form.place,
          license : this.form.license
        }).then(({ data }) => {
          console.log(data)
        });
        this.getUserData();
      }
      
    }
  },
};
</script>

<style>
.profile {
  margin-right: auto;
  margin-left: auto;
  margin-top: 5%;
  width: 90%;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.postalRow{
  display: flex;
  flex-wrap: wrap;
}
</style>
