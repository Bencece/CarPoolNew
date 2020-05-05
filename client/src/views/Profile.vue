<template>
  <div>
    <h1>Profilod</h1><br>
    <h2>Üdv a profilodban {{ getUser.name }}!</h2>
  </div>
</template>

<script>
import { authComputed } from '../store/helpers';

export default {
  data () {
    return {
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
  }
}
</script>

<style>
</style>
