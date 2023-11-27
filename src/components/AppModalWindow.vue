<template>
  <div class="component" @click.self="close" v-if="show">
    <div class="modal">
      <div
        class="header"
        :style="
          !!type
            ? {
                background: COLORS_INFO[type].bgColor,
                color: COLORS_INFO[type].color,
                borderColor: COLORS_INFO[type].color,
              }
            : {
                background: COLORS_INFO[TYPE.INFO].bgColor,
                color: COLORS_INFO[TYPE.INFO].color,
                borderColor: COLORS_INFO[TYPE.INFO].color,
              }
        "
      >
        <h3>
          {{ !!type ? TITLE_TYPE_LIST[type] : TITLE_TYPE_LIST[TYPE.INFO] }}
        </h3>
        <span>{{ timeLocal }}</span>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onDeactivated } from "vue";
import { TITLE_TYPE_LIST, COLORS_INFO, TYPE } from "../consts";
const { show, type, time, message } = defineProps([
  "show",
  "type",
  "time",
  "message",
]);
const emit = defineEmits(["close"]);
const timeLocal = ref(time);
let idTimeInterval = null;

switch (timeLocal.value) {
  case undefined: {
    break;
  }
  default: {
    if (timeLocal.value !== 0) {
      idTimeInterval = setInterval(() => {
        if (timeLocal.value) {
          timeLocal.value--;
        } else {
          clearInterval(idTimeInterval);
          emit("close", false);
        }
      }, 1000);
    }
  }
}

const close = () => {
  emit("close", false);
};
onDeactivated(() => {
  clearInterval(idTimeInterval);
});
</script>

<style lang="scss" scoped>
.component {
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
}
.modal {
  max-width: 300px;
  width: 100%;
  min-height: 150px;
  background: #fff;
  border-radius: 10px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 20px #5c4f4f;
  overflow: hidden;
}
.header {
  border-width: 1px;
  border-style: solid;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
}
.header,
.body,
.footer {
  padding: 0 15px;
}

.body {
  display: flex;
  flex: 1;
  padding: 15px;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  min-height: 100px;
}
.header {
  font-size: 20px;
  background: #49b7e9;
  color: #fff;
  padding: 10px 15px;
}
.body {
}
.footer {
}
</style>
