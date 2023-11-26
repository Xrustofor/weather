<template>
  <h1>Chosen page</h1>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.commit("chosen/setGeolocations");
// const geolocations = computed(() => store.getters("chosen/getGeolocations"));
console.log(geolocations.value);
</script>
