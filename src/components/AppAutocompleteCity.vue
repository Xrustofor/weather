<template>
  <div class="g_map_autocomplete">
    <multiselect
      v-model="city"
      label="name"
      placeholder="Enter the name of the city"
      :options="items"
      :loading="loading"
      :options-limit="300"
      :limit="limit"
      :limit-text="limitText"
      :max-height="600"
      @search-change="asyncFind"
      @select="select"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import Multiselect from "vue-multiselect";

const emit = defineEmits(["selected", "onEnterText"]);
const city = ref("");

const limit = 3;

const { items, loading } = defineProps(["items", "loading"]);

const limitText = (count) => `and ${count} other countries`;
const asyncFind = async (text) => {
  if (text.length < limit) return;
  emit("onEnterText", text);
};

const select = () => {
  if (!city.value) return;
  const { name, latitude, longitude } = city.value;
  const data = {
    city: name,
    position: {
      lat: latitude,
      lon: longitude,
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
    width: 100%;
  }
}
</style>
