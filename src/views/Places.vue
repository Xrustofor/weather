<template>
  <div class="page">
    <GMapAutocomplete
      placeholder="Виберіть ваше місто."
      @place_changed="setPlace"
      v-model="city"
    >
    </GMapAutocomplete>
    <button @click="shuffleData">Shuffle</button>
    <pre>{{ location }}</pre>
    <div class="table_wrap">
      <table v-if="items.length">
        <tbody>
          <tr v-for="data of headerItems" :key="`header-${data.key}`">
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
    <BarChart v-bind="barChartProps" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Chart, registerables } from "chart.js";
import { BarChart, useBarChart } from "vue-chart-3";
import { shuffle } from "lodash";

Chart.register(...registerables);

export default {
  components: { BarChart },
  setup() {
    const headerItems = [
      { key: "hour", value: "Година" },
      { key: "icon", value: "" },
      { key: "temp", value: "Температура" },
      { key: "feels_like", value: "Відчувається як" },
      { key: "pressure", value: "Тиск" },
      { key: "humidity", value: "Вологість" },
      { key: "dew_point", value: "Точка роси" },
      { key: "clouds", value: "Хмари" },
      { key: "wind_speed", value: "Швидкість вітру м/c" },
      { key: "wind_deg", value: "Напрямок вітру" },
      { key: "wind_gust", value: "Порив вітру" },
    ];

    const store = useStore();
    const city = ref("");
    const location = ref({
      lat: null,
      lon: null,
    });

    const items = computed(() => store.state.items);
    const chartLabels = computed(() =>
      store.state.items.map((item) => item.hour)
    );

    const data = computed(() => store.state.items.map((item) => item.temp));

    const chartData = computed(() => ({
      labels: chartLabels.value,
      datasets: [
        {
          data: data.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
    });

    function shuffleData() {
      console.log("shuffleData");
      data.value = shuffle(data.value);
    }

    const getImageUrl = (name) => {
      return new URL(`../assets/png/${name}.png`, import.meta.url);
    };

    const setPlace = (e) => {
      city.value = e.vicinity;
      location.value.lat = e.geometry.location.lat();
      location.value.lon = e.geometry.location.lng();
      store.dispatch("getOneDay", location.value);
    };

    return {
      setPlace,
      city,
      location,
      items,
      getImageUrl,
      headerItems,
      barChartProps,
      barChartRef,
      shuffleData,
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
}
.table_wrap {
  display: flex;
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
