<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-21 11:20:34
-->
<template>
  <div class="cust-pagination">
    <el-pagination
      background
      hide-on-single-page
      @current-change="paginateHandle"
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page="index"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomerElPagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 20,
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const paginateHandle = page => {
      emit('change', page);
    };
    return {
      paginateHandle,
    };
  },
});
</script>
<style lang="scss" scoped>
.cust-pagination {
  width: 100%;
  @include jcc-aic;
}
</style>
