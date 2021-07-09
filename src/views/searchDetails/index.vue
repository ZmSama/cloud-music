<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-02 10:21:16
-->
<template>
  <div class="search-wrap">
    <el-table
      :data="tableData"
      v-loading="loading"
      stripe
      size="mini"
      style="width: 100%"
      max-height="610"
      @row-dblclick="rowClickHandle"
    >
      <el-table-column type="index" width="80" :index="indexMethod"></el-table-column>
      <el-table-column prop="pic" width="80">
        <template #default="scope">
          <el-image style="width: 30px; height: 30px" :src="scope.row.pic" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="songName"
        label="音乐标题"
        width="300"
      ></el-table-column>
      <el-table-column prop="art" label="歌手" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column prop="al" label="专辑" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dt" label="时长">
        <template #default="scope">
          <span>{{ dtJudge(scope.row.dt) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="60">
        <div class="operate_wrap">
          <i class="iconfont icon-xiazai1"></i>
          <i class="iconfont icon-heart"></i>
        </div>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        hide-on-single-page
        @current-change="paginateHandle"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, toRefs, watch, watchEffect } from 'vue';
import { SEARCH_SONG } from '@/api/modules/searchSong';
import { GET_SONG_BY_ID, GET_SONG_PIC } from '@/api/modules/music';
import { useStore } from '@/store/index';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'SearchDetails',
  setup() {
    const state = reactive({
      tableData: [],
      loading: false,
      total: 0,
      index: 1,
      size: 30,
    });
    const store = useStore();
    const route = useRoute();
    const indexMethod = (index: number) => {
      index += 1;
      return index >= 10 ? index : '0' + index;
    };

    const dtJudge = (time: number) => {
      let dt = time / 1000;
      let m = Math.ceil(dt / 60);
      let s = Math.ceil(dt % 60);
      return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    // 查询方法
    const searchSong = async key => {
      state.loading = true;
      let res = await SEARCH_SONG({
        keywords: key,
        offset: state.index,
        limit: state.size,
      });
      if (res.data.status) {
        state.loading = false;
        state.total = res.data.result.songCount;
        state.tableData = res.data.result.songs.map(item => {
          return {
            songName: item.name,
            art: item.ar.map(item => item.name).join('/'),
            al: item.al.name,
            pic: item.al.picUrl,
            id: item.id,
            dt: item.dt,
          };
        });
      }
    };

    // 根据id得到歌曲播放地址和封面
    const getSongByid = async row => {
      // 得到歌曲信息
      Promise.all([GET_SONG_BY_ID({ id: row.id }), GET_SONG_PIC({ ids: row.id })]).then(res => {
        // // 将信息和选择的组装一下提交到vuex
        let songObj = {
          ...row,
          url: res[0].data.data[0].url,
          type: res[0].data.data[0].encodeType,
          size: res[0].data.data[0].size,
          pic: res[1].data.songs[0].al.picUrl,
        };
        store.commit('playModel/SET_MUSIC_SOURCE', songObj);
        nextTick(() => {
          store.commit('playModel/PLAY_MUSIC');
        });
      });
      // console.log(res2.data.songs[0].al.picUrl);
    };

    // 分页方法
    const paginateHandle = page => {
      state.index = page;
      searchSong(route.params.info);
    };

    // 双击播放
    const rowClickHandle = async row => {
      store.commit('playModel/RESET_MUSIC_STATE');
      getSongByid(row);
    };

    // onMounted(() => {
    //   searchSong(route.params.info);
    // });

    watchEffect(() => {
      searchSong(route.params.info);
    });

    // watch(
    //   () => route.params.info,
    //   val => {
    //     console.log(val);

    //     searchSong(val);
    //   }
    // );
    return {
      ...toRefs(state),
      indexMethod,
      paginateHandle,
      rowClickHandle,
      dtJudge,
    };
  },
});
</script>
<style lang="scss" scoped>
.search-wrap {
  height: 82vh;
  width: 100%;
  position: relative;
}
.operate_wrap {
  display: flex;
  justify-content: space-between;
  i {
    cursor: pointer;
  }
}
.pagination {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
