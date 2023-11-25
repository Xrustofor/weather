<template>
  <div class="component">
    <div class="radio-tabs-wrapper">
      <div class="slot_title">
        <slot name="title"></slot>
      </div>
      <div class="input_wrap">
        <input
          type="radio"
          class="radio-tab"
          name="radioTab"
          value="1"
          id="tab1"
          checked
          @click="onClick(CONSTANTS.HOUR)"
        />
        <label for="tab1">День</label>
        <input
          type="radio"
          class="radio-tab"
          name="radioTab"
          value="7"
          id="tab2"
          @click="onClick(CONSTANTS.DAY)"
        />
        <label for="tab2">Тиждень</label>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { CONSTANTS } from "../consts";
const emit = defineEmits(["selected"]);
const onClick = (item) => {
  emit("selected", item);
};
</script>

<style lang="scss" scoped>
.component {
  border-bottom: 1px solid #49b7e9;
}
.radio-tabs-wrapper {
  clear: both;
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #49b7e9;
  position: relative;
  display: flex;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}

.input_wrap {
  min-width: 200px;
}

.slot_title {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  min-width: 200px;
  align-items: flex-start;
  height: 33px;
}
.input_wrap,
.slot_title {
  flex: 1;
}

input.radio-tab {
  position: absolute;
  left: -99999em;
  top: -99999em;

  & + label {
    cursor: pointer;
    float: left;
    border: 1px solid #388bb1;
    border-bottom: 0;
    background-color: #388bb1;
    color: #fff;
    border-radius: 5px 5px 0 0;
    margin-right: -1px;
    padding: 0.5em 1em;
    position: relative;
    transition: 0.3s linear;
    margin-right: 10px;
    &:hover {
      background-color: #eee;
      color: #000;
    }
  }

  &:checked + label {
    background-color: #fff;
    border-color: #388bb1;
    border-bottom: 0;
    color: #000;
    z-index: 1;
  }
}
</style>
