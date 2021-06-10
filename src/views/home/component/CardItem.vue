<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-07 10:03:29
-->
<template>
  <div class="zm-card-item" :style="sty" @click="clickHandler">
    <div class="zm-card-item__prefix">
      <svg-icon :name="prefix" :size="size"></svg-icon>
    </div>
    <div class="zm-card-item__label">
      <span>{{ label }}</span>
    </div>
    <div class="zm-card-item__suffix">
      <span class="suffix-text" v-show="suffixText">{{ suffixText }}</span>
      <svg-icon :name="suffixIcon" size="25px" v-show="suffixIcon"></svg-icon>
    </div>
    <div class="zm-card-item__suffix-icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: '',
  props: {
    prefix: {
      type: String,
      default: 'VIP',
    },
    size: {
      type: String,
      default: '30px',
    },
    label: {
      type: String,
      default: '标题',
    },
    suffixText: {
      type: String,
      default: '',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    isBorder: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const sty = computed(() => (props.isBorder ? 'border-bottom:1px solid rgba(0,0,0,0.1)' : ''));

    const clickHandler = () => {
      emit('click');
    };
    return {
      sty,
      clickHandler,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(card-item) {
  width: 100%;
  height: 50px;
  transition: 0.1s;
  cursor: pointer;
  padding-right: 10px;
  box-sizing: border-box;
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
  @include jcc-aic-row;
  @include e(prefix) {
    height: 100%;
    @include jcc-aic;
    flex: 1;
  }
  @include e(label) {
    font-size: 16px;
    flex: 3;
  }
  @include e(suffix) {
    font-size: 14px;
    color: #ccc;
    flex: 1;
    @include jcc-aic;
    .suffix-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 60px;
      text-align: center;
    }
  }
  @include e(suffix-icon) {
    width: 8px;
    height: 8px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    transform: rotate(-45deg);
  }
}
</style>
