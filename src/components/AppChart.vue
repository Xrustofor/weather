<template>
  <div class="component">
    <canvas :height="height || 80" ref="appChart"></canvas>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { ref, defineProps, computed, onMounted } from "vue";

const { items, header, label, height, update } = defineProps([
  "items",
  "header",
  "label",
  "height",
  "update",
]);

const appChart = ref(null);
let chart = null;
const locLabel = computed(() => label);
const locHeader = computed(() => header);
const locItems = computed(() => items);

const datasets = [
  {
    label: locLabel.value,
    data: locItems.value,
    backgroundColor: ["#49b7e9"],
    borderColor: "#49b7e9",
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  },
];

onMounted(() => {
  const ctx = appChart.value;
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: locHeader.value,
      datasets,
      borderWidth: 3,
    },
  });
});
</script>

<style lang="scss" scoped>
.component {
  width: 100%;
  min-height: 350px;
}
</style>