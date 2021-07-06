<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-02 10:21:37
-->
<template>
  <div class="zm-table">
    <!-- 用来接收插槽内容的，但是不展示用 -->
    <div class="hidden-columns">
      <slot></slot>
    </div>

    <div class="zm-table__header-wrapper">
      <table-header />
    </div>

    <div class="zm-table__body-wrapper">
      <table-body />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, VNode, ref, Fragment, reactive, toRefs } from 'vue';
import TableHeader from './table-header/index.vue';
import TableBody from './table-body/index.vue';
export default defineComponent({
  name: 'ZmTable',
  components: {
    TableHeader,
    TableBody,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const { data } = props;
    // 获得插槽内容
    const slotsArr = slots.default();
    const state = reactive({
      children: [] as VNode[],
    });
    Array.from(slotsArr).map((item: VNode) => {
      if (item.type === Fragment) {
        state.children.push(...(item.children as VNode[]));
      } else {
        state.children.push(item);
      }
    });
    provide('data', data);
    provide('children', state.children);
  },
});
</script>
<style lang="scss" scoped>
@include b(table) {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;

  @include e(header-wrapper) {
    width: 100%;
    overflow: hidden;
  }
}

.hidden-columns {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
</style>
