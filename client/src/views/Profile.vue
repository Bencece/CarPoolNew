<template>
  <div class="profile">
    <h1>Profilod</h1>
    <h2>Üdv a profilodban {{ getUser.name }}!</h2>
    <div class="settingsBox">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
            ></b-form-input>
            <b-form-input
              id="input-city"
              v-model="form.city"
              required
              placeholder="település"
              class="col-sm-8"
            ></b-form-input>
          </div>
            <b-form-input
              id="input-place"
              v-model="form.place"
              required
              placeholder="utca, házszám, emelet, ajtó"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-license">
            <b-form-checkbox 
            v-model="form.license" 
            id="checkboxes-license" 
            value="true"
            required
            >
              Rendelkezem érvényes személygépjármű vezetéséhez szükséges jogosítvánnyal.
              </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary">Mentés</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers";

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
    };
  },
  computed: {
    ...authComputed,
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
  },
};
</script>

<style>
.profile {
  margin: auto;
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
