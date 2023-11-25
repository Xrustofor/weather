<template>
  <div class="component">
    <LineChart :height="250" v-bind="barChartProps" />
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { useBarChart, LineChart } from "vue-chart-3";
Chart.register(...registerables);
import { ref, defineProps, computed } from "vue";

const { items, header, label } = defineProps(["items", "header", "label"]);
const locItems = computed(() => items);
const locHeader = computed(() => header);
const chartData = computed(() => ({
  labels: locHeader.value,
  datasets: [
    {
      data: locItems.value,
      backgroundColor: ["#ec6e4c"],
      label,
    },
  ],
}));

const { barChartProps, barChartRef } = useBarChart({
  chartData,
});
</script>

<style></style>
