<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-21 17:20:21
-->
<template>
  <div>
    <div class="tab-nav">
      <div class="tab-nav-item">
        {{ title }}
      </div>
    </div>
    <div class="tab-content">
      <div class="tab-content-item">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabItem',
  props: {
    title: {
      type: String,
      default: '页面一',
    },
  },
  setup(props, ctx) {},
});
</script>
<style lang="scss" scoped></style>
