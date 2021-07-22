<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-20 09:53:14
-->
<template>
  <div class="subscriber-wrap" v-loading="loading">
    <div class="item" v-for="i in subcriberList" :key="i.userId">
      <div class="cover">
        <el-avatar :size="70" :src="i.avatarUrl"></el-avatar>
      </div>
      <div class="info">
        <div class="name">
          <span>{{ i.nickname }}</span>
          <template v-if="i.gender === 0">
            <i class="iconfont icon-nv" style="color: rgb(255, 205, 232)"></i>
          </template>
          <template v-else>
            <i class="iconfont icon-nan" style="color: rgb(192, 243, 255)"></i>
          </template>
        </div>
        <div class="signature">{{ i.signature }}</div>
      </div>
    </div>
  </div>
  <div class="pagination">
    <el-pagination
      background
      hide-on-single-page
      layout="prev, pager, next"
      :total="total"
      @current-change="paginateHandle"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { GET_SONG_SUBSCRIBER_BY_ID } from '@/api/modules/music';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SubscriberList',
  setup() {
    const state = reactive({
      subcriberList: [],
      index: 1,
      size: 20,
      total: 0,
      loading: false,
    });

    const route = useRoute();
    // 得到歌单收藏者
    const getSubscriber = async (id: string) => {
      state.loading = true;
      let res = await GET_SONG_SUBSCRIBER_BY_ID({ id, offset: state.index, limit: state.size });
      if (res.data) {
        state.loading = false;
        state.subcriberList = res.data.subscribers;
        state.total = res.data.total;
      }
    };

    // 分页
    const paginateHandle = val => {
      state.index = val;
      getSubscriber(route.query.id as string);
    };

    watchEffect(() => {
      let id = route.query.id as string;
      if (id) {
        getSubscriber(id);
      }
    });
    return {
      ...toRefs(state),
      paginateHandle,
    };
  },
});
</script>
<style lang="scss" scoped>
.subscriber-wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  .item {
    width: 100%;
    @include jcc-aic-row;
    padding: 10px;
    cursor: pointer;
    .info {
      @include jcc-aic-row;
      flex-direction: column;
      font-size: 16px;
      row-gap: 10px;
      padding-left: 10px;
      .name {
        @include jcc-aic-row;
        column-gap: 5px;
      }
      .signature {
        font-size: 14px;
        padding-left: 5px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
.pagination {
  margin-top: 10px;
  width: 100%;
  @include jcc-aic;
}
</style>
