<template>
  <div class="page" v-if="geolocations.length">
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
        <button @click="remove(data.uuid, data.city)">Видалити</button>
      </div>
    </div>
    <Teleport to="body">
      <AppModalWindow
        v-if="showModal"
        :show="showModal"
        @close="closeModal"
        :type="TYPE.WARNING"
        :message="message"
      >
        {{ message }}
        <template v-slot:footer>
          <div class="modal_buttons">
            <button
              @click="
                showModal = false;
                uuid = null;
              "
            >
              Ні
            </button>
            <button class="successes" @click="removed">Так</button>
          </div>
        </template>
      </AppModalWindow>
    </Teleport>
    <Teleport to="body" v-if="loading">
      <AppLoading />
    </Teleport>
  </div>
  <AppInfo v-else text="Ви не добавили жодного міста в обране."></AppInfo>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import AppTable from "@/components/AppTable.vue";
import AppTabs from "@/components/AppTabs.vue";
import AppChart from "@/components/AppChart.vue";
import AppModalWindow from "@/components/AppModalWindow.vue";
import AppLoading from "@/components/AppLoading.vue";
import AppInfo from "@/components/AppInfo.vue";
import { CONSTANTS, LABLEL_CHART, TYPE } from "@/consts";

const store = useStore();

onMounted(async () => {
  store.commit("setLoading", true);
  await store.dispatch("chosen/getAllOneDay", geolocations.value);
  store.commit("setLoading", false);
});

store.commit("chosen/setGeolocations");
const geolocations = computed(() => store.getters["chosen/getGeolocations"]);

const header = computed(() => store.getters.getHeader);
const loading = computed(() => store.getters.getLoading);
const items = computed(() => store.getters["chosen/getItems"]);
const showModal = ref(false);
const message = ref("");
const uuid = ref("");

const selected = async (item) => {
  const { key } = item;
  store.commit("setLoading", true);
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
  store.commit("setLoading", false);
};

const remove = (id, city) => {
  showModal.value = true;
  message.value = `Ви дійсно хочете видалити місто ${city} із списку обраних ?`;
  uuid.value = id;
};

const removed = () => {
  store.dispatch("chosen/removeCity", uuid.value);
  showModal.value = false;
  uuid.value = "";
};

const closeModal = () => {
  showModal.value = false;
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
  }
}
.modal_buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  button {
    min-width: 100px;
  }
}
</style>
