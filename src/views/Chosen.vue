<template>
  <div class="page">
    <div v-for="data of items" :key="data.uuid" class="card_wrap">
      <div class="card">
        <div class="column">
          <AppTabs
            v-if="data.items.length"
            :id="data.uuid"
            @selected="selected({ key: $event, uuid: data.uuid })"
          >
            <template v-slot:title>
              <h2>{{ data.city }}</h2>
            </template>
            <AppTable :items="data.items" :header="header" />
          </AppTabs>
        </div>
        <div class="column chart">
          <AppChart
            :key="`${data.chartKey}-${data.uuid}`"
            v-if="data.items.length"
            :items="data.items.map((d) => `${d.temp}`)"
            :header="data.items.map((d) => `${d.time}`)"
            :label="LABLEL_CHART[data.typeView]"
            :height="175"
          />
        </div>
      </div>
      <div class="footer">
        <button>Видалити</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AppTable from "@/components/AppTable.vue";
import AppTabs from "@/components/AppTabs.vue";
import AppChart from "@/components/AppChart.vue";
import { CONSTANTS, LABLEL_CHART } from "../consts";

const store = useStore();
store.commit("chosen/setGeolocations");
const geolocations = computed(() => store.getters["chosen/getGeolocations"]);
const items = computed(() => store.getters["chosen/getItems"]);
store.dispatch("chosen/getAllOneDay", geolocations.value);
const header = computed(() => store.getters.getHeader);

const selected = async (item) => {
  const { key } = item;
  switch (key) {
    case CONSTANTS.DAY: {
      await store.dispatch("chosen/getWeekChosen", item);
      break;
    }
    case CONSTANTS.HOUR: {
      await store.dispatch("chosen/getOneDayChosen", item);
      break;
    }
  }
  console.log(item);
};
</script>
<style lang="scss" scoped>
.page {
  overflow: hidden;
}
.card_wrap {
  overflow: auto;
  margin-bottom: 25px;
  .card {
    display: flex;
    flex-wrap: wrap;
  }

  .column {
    min-width: 250px;
    display: flex;
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
  .column.chart {
    display: flex;
    align-items: center;
  }
  .footer {
    margin-top: 15px;
    text-align: right;
    button {
    }
  }
}
</style>
