<template>
  <div class="component">
    <table v-if="items.length">
      <tbody>
        <tr v-for="data of header" :key="`header-${data.key}`">
          <td>{{ data.value }}</td>
          <td v-for="item of items" :key="`weather-${item.hour}`">
            <span v-if="data.key === 'icon'">
              <img width="35" :src="getImageUrl(item.icon)" />
            </span>
            <span v-else-if="data.key == 'temp' || data.key == 'feels_like'">{{
              `${item[data.key]}&#176; С`
            }}</span>
            <div
              class="wind_deg"
              v-else-if="data.key === 'wind_deg'"
              :style="`transform: rotate(${item[data.key]}deg)`"
            >
              <img width="15" src="../assets//svg/wind.deg.svg" />
            </div>
            <span v-else>{{ item[data.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
const { items, header } = defineProps(["items", "header"]);

const getImageUrl = (name) => {
  return new URL(`../assets/png/${name}.png`, import.meta.url);
};
</script>

<style lang="scss" scoped>
.component {
  width: 100%;
  overflow: auto;
}
td,
th {
  padding: 7px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
}
tbody tr:nth-child(odd) {
  background-color: #dbf1fb;
}
tbody tr:nth-child(2) td {
  padding: 0 7px;
}
tbody tr:nth-child(even) {
  background-color: #aedff5;
}
tbody tr td:first-child {
  text-align: left;
}

tbody tr {
  background-image: url(noise.png);
}

table {
  background-color: #dbf1fb;
}
</style>