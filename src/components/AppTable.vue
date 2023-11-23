<template>
  <div class="component">
    <table v-if="items.length">
      <tbody>
        <tr v-for="data of header" :key="`header-${data.key}`">
          <td>{{ data.value }}</td>
          <td v-for="item of items" :key="`weather-${item.hour}`">
            <span v-if="data.key !== 'icon'">{{
              `${item[`${data.key}`]}`
            }}</span>
            <img v-else width="35" :src="getImageUrl(item.icon)" />
            <span v-if="data.key == 'hour'">:00</span>
            <span v-if="data.key == 'temp' || data.key == 'feels_like'"
              >&#176; С</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

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
  padding: 10px 7px;
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
