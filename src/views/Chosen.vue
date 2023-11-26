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
  </div>
  <div v-else class="empty_wrap">
    <div class="empty">
      <p>Ви не добавили жодного міста в обране.</p>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AppTable from "@/components/AppTable.vue";
import AppTabs from "@/components/AppTabs.vue";
import AppChart from "@/components/AppChart.vue";
import { CONSTANTS, LABLEL_CHART, TYPE } from "@/consts";
import AppModalWindow from "@/components/AppModalWindow.vue";

const store = useStore();
store.commit("chosen/setGeolocations");
const geolocations = computed(() => store.getters["chosen/getGeolocations"]);
store.dispatch("chosen/getAllOneDay", geolocations.value);
const header = computed(() => store.getters.getHeader);

const items = computed(() => store.getters["chosen/getItems"]);
const showModal = ref(false);
const message = ref("");
const uuid = ref("");

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

.empty_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    max-width: 300px;
    width: 100%;
    p {
      text-align: center;
      font-size: 25px;
      line-height: 35px;
    }
  }
}
</style>
