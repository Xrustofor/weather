<template>
  <div class="component">
    <canvas :height="80" ref="appChart"></canvas>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { ref, defineProps, computed, onMounted } from "vue";

const { items, header, label } = defineProps(["items", "header", "label"]);

const appChart = ref(null);
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
  new Chart(ctx, {
    type: "line",
    data: {
      labels: locHeader.value,
      datasets,
      borderWidth: 3,
    },
  });
});
</script>

<style></style>
