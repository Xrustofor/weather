<template>
  <div class="page">
    <div class="input_button_wrap">
      <div class="input_button">
        <div class="wrap" :class="items.length || 'warning'">
          <!-- <AppAutocompleteCity @selected="setSelectedCity" /> -->
          <AppAutocompleteCity
            :loading="loading"
            :items="citys"
            @onEnterText="onEnterText"
            @selected="setSelectedCity"
          />
        </div>
        <div class="wrap">
          <button @click="addGeolocation">В обране</button>
        </div>
      </div>
    </div>
    <template v-if="items.length">
      <AppTabs :id="geolocation.uuid" @selected="selected">
        <template v-slot:title>
          <h2>{{ city }}</h2>
        </template>
        <AppTable :items="items" :header="header" />
      </AppTabs>

      <AppChart
        :key="chartKey"
        v-if="chartItems.length"
        :items="chartItems"
        :header="chartHeader"
        :label="labelChart"
      />
    </template>
    <AppInfo v-else text="У вас не вибране жодного міста."></AppInfo>

    <Teleport to="body">
      <AppModalWindow
        v-if="showModal"
        :show="showModal"
        @close="closeModal"
        :type="type"
        :time="timeMessage"
        :message="message"
      >
        {{ message }}
      </AppModalWindow>
    </Teleport>
    <Teleport to="body" v-if="loading">
      <AppLoading />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import AppAutocompleteCity from "@/components/AppAutocompleteCity.vue";
import AppTable from "@/components/AppTable.vue";
import AppChart from "@/components/AppChart.vue";
import AppTabs from "@/components/AppTabs.vue";
import AppModalWindow from "@/components/AppModalWindow.vue";
import AppLoading from "@/components/AppLoading.vue";
import AppInfo from "@/components/AppInfo.vue";
import { CONSTANTS } from "../consts";

const chartKey = ref(new Date().getTime());
const store = useStore();
const city = ref("");
const type = ref(CONSTANTS.HOUR);
const labelChart = ref("");
const showModal = ref(false);
const message = ref("");
const timeMessage = ref(null);

store.dispatch("saveCurentLocation");

const geolocation = computed(() => store.getters.getStoreGeolocation);
if (geolocation.value) {
  city.value = geolocation.value.city;
  getData();
}

const header = computed(() => store.getters.getHeader);
const items = computed(() => store.getters.getItems);
const loading = computed(() => store.getters.getLoading);
const citys = computed(() => store.getters.citys);
const chartItems = computed(() => items.value.map((item) => `${item.temp}`));
const chartHeader = computed(() => items.value.map((item) => item.time));

const onEnterText = (text) => {
  store.dispatch("getCitys", text);
};

const setSelectedCity = async (item) => {
  store.commit("setLoading", true);
  await store.commit("setCurentLocation", item);
  store.commit("setLoading", false);
  city.value = item.city;
  getData(item);
};

const selected = (item) => {
  if (type.value === item) return;
  type.value = item;
  getData();
};

async function getData(item) {
  store.commit("setLoading", true);
  switch (type.value) {
    case CONSTANTS.HOUR: {
      await store.dispatch("getOneDay", geolocation.value || item);
      labelChart.value = "Добовий графік температури";
      updateChart();
      break;
    }
    case CONSTANTS.DAY: {
      await store.dispatch("getWeek", geolocation.value || item);
      labelChart.value = "Графік температури за 5 днів";
      updateChart();
      break;
    }
  }
  store.commit("setLoading", false);
}
function updateChart() {
  chartKey.value = new Date().getTime();
}

const addGeolocation = async () => {
  const location = geolocation.value;
  const result = await store.dispatch("saveGeolocation", location);
  showModal.value = true;
  type.value = result.type;
  message.value = result.message;
  timeMessage.value = result.time;
};

const closeModal = (payload) => {
  showModal.value = payload;
};
</script>
<style lang="scss" scoped>
.page {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input_button_wrap {
  padding: 0 7px;
}
.input_button {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -15px;
  margin-bottom: 10px;

  .wrap {
    display: flex;
    width: auto;
    align-items: center;
    align-content: center;
    margin: 0 7px;
    margin-bottom: 10px;
    &:first-child {
      flex: 1;
      max-width: 500px;
      min-width: 250px;
    }
    &:last-child {
      justify-content: end;
      min-width: 150px;
    }
    @media (max-width: 462px) {
      flex: 1;
    }
    button {
      width: 100%;
      padding: 10px 15px;
      outline: none;
      border: 0;
      border-radius: 5px;
      opacity: 0.7;
      transition: 0.3s linear opacity;
      background: #49b7e9;
      color: #fff;
      &:hover {
        transition: 0.3s linear opacity;
        opacity: 1;
      }
    }
  }
}

.warning {
  border-radius: 5px;
  box-shadow: 0px 0px 10px #7aa4b7;
  animation: blink 1.3s infinite;

  @keyframes blink {
    0% {
      box-shadow: none;
    }
    30% {
      box-shadow: 0px 0px 10px #7aa4b7;
    }
    70% {
      box-shadow: 0px 0px 10px #7aa4b7;
    }
    100% {
      box-shadow: none;
    }
  }
}
</style>
