<template>
  <div class="component">
    <LineChart v-bind="barChartProps" />
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { useBarChart, LineChart } from "vue-chart-3";
Chart.register(...registerables);
import { ref, defineProps, computed } from "vue";

const { items, header } = defineProps(["items", "header"]);
const locItems = computed(() => items);
const locHeader = computed(() => header);
const chartData = computed(() => ({
  labels: locHeader.value,
  datasets: [
    {
      data: locItems.value,
      backgroundColor: ["#ec6e4c"],
      label: "Добовий графік температури",
    },
  ],
}));

const { barChartProps, barChartRef } = useBarChart({
  chartData,
});
</script>

<style></style>
