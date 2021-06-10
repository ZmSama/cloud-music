<!--
 * @Description: 按钮
 * @Autor: ZmSama
 * @Date: 2021-05-28 16:28:34
-->

<template>
  <div :class="['zm-button', 'zm-button--' + size]" @click="clickHandler">
    <slot>按钮1</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ZmButton',
  props: {
    size: {
      type: String,
      default: 'medium',
    },
  },
  // 标识需要提供自定义点击事件
  emits: ['click'],
  setup(props, ctx) {
    const clickHandler = e => {
      ctx.emit('click', e);
    };

    return {
      clickHandler,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(button) {
  // border: 1px solid #ccc;
  cursor: pointer;
  padding: 5px;
  width: 100px;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  @include jcc-aic-row;
  @include m(medium) {
    width: 100px;
    height: 40px;
    font-size: 20px;
    &::after {
      content: '';
      border: solid#ccc;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 5px;
      transform: rotate(-45deg);
      margin-left: 3px;
    }
  }

  @include m(small) {
    width: 80px;
    height: 30px;
    font-size: 16px;
    &::after {
      content: '';
      border: solid#ccc;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 4px;
      transform: rotate(-45deg);
      margin-left: 3px;
    }
  }

  @include m(mini) {
    width: 60px;
    height: 20px;
    font-size: 12px;
    &::after {
      content: '';
      border: solid#ccc;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(-45deg);
      margin-left: 3px;
    }
  }
}
</style>
