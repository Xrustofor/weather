<template>
  <div class="component">
    <div class="main">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const { text } = defineProps(["text"]);
</script>
<style lang="scss" scoped>
.component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    max-width: 300px;
    width: 100%;
    text-align: center;
    font-size: 25px;
    line-height: 35px;
    p {
      text-align: inherit;
      font-size: inherit;
      line-height: inherit;
    }
  }
}
</style>
