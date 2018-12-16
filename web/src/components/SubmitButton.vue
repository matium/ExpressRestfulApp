<template>
  <a class="SubmitButton" href="javascript:void(0);" v-on:click="emitClick">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SubmitButton extends Vue {

  private emitClick (event: MouseEvent) {
    console.log('SubmitButton Click');
    this.$emit('click', event);
  }

}
</script>

<style scoped lang="scss">
.SubmitButton {
  display: block;
  width: 100%;
  height: 3em;
  line-height: 3em;
  background-color: #2e2e2e;
  color: #fff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background-color: #00B7FF;
  }
}
</style>