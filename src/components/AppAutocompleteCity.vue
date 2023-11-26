<template>
  <div class="g_map_autocomplete">
    <GMapAutocomplete
      placeholder="Виберіть ваше місто."
      @place_changed="setPlace"
      v-model="city"
      :options="{}"
    />
  </div>
  <pre>{{ city }}</pre>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["selected"]);
const city = ref("");
const setPlace = (e) => {
  const data = {
    uuid: e.place_id,
    city: e.name,
    position: {
      lat: e.geometry.location.lat(),
      lon: e.geometry.location.lng(),
    },
  };
  emit("selected", data);
};
</script>

<style lang="scss">
.g_map_autocomplete {
  position: relative;
  width: 100%;
  input {
    padding: 8px 30px 8px 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
  }
}
</style>
