<template>
  <div class="app">
    <img
      class="fit-picture"
      src="./assets/weather.svg"
      alt="Grapefruit slice atop a pile of other slices"
      :style="{ height: '100px' }"
    />
    <main>
      <AppNavigation class="navigate" />
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import AppNavigation from "./components/AppNavigation.vue";
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  position: relative;
  margin-top: 50px;
  display: flex;
  flex: 1;
  padding: 15px;
  background: #fff;
  box-shadow: 0px 0px 20px #5c4f4f;
  border-radius: 0 10px 10px 10px;
  .navigate {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
  }
}
</style>
