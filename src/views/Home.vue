<template>
  <div class="wrap">
    <AppAutocompleteCity @selected="setSelectedCity" />
    <AppTable :items="items" :header="header" />
    <AppChart
      :key="chartKey"
      v-if="chartItems.length"
      :items="chartItems"
      :header="chartHeader"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import AppAutocompleteCity from "../components/AppAutocompleteCity.vue";
import AppTable from "../components/AppTable.vue";
import AppChart from "../components/AppChart.vue";

const chartKey = ref(new Date().getTime());

const store = useStore();
store.dispatch("getCurrentGeolocation");

const geolocation = computed(() => store.getters.getLocalGeolocation);
if (geolocation) {
  store.dispatch("getOneDay", geolocation.value);
}
const header = computed(() => store.getters.getHeader);
const items = computed(() => store.getters.getItems);
const chartItems = computed(() => items.value.map((item) => item.temp));
const chartHeader = computed(() =>
  items.value.map((item) => item.hour + ":00")
);

const setSelectedCity = (item) => {
  store.dispatch("getOneDay", item);
  chartKey.value = new Date().getTime();
};
</script>
<style lang="scss" scoped>
.wrap {
  max-width: 100%;
  width: 100%;
}
</style>
