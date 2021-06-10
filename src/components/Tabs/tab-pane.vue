<!--
 * @Description: tabs的内容组件
 * @Autor: ZmSama
 * @Date: 2021-05-24 11:03:11
-->
<template>
  <div v-show="active" :style="{ height: height }">
    <slot>这是默认的插槽内容</slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { RootTabs } from './index.vue';
export default defineComponent({
  name: 'tabPane',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '40vh',
    },
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean,
  },
  setup(props, ctx) {
    const rootTabs = inject<RootTabs>('rootTabs');
    // 根据父组件提供的当前名字和标签上的属性判断是否处于激活状态，激活则显示反之隐藏
    const active = computed(() => rootTabs.currentName.value == props.label);
    return {
      active,
    };
  },
});
</script>
<style lang="scss" scoped></style>
