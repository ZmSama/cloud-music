<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-21 15:09:53
-->
<template>
  <div class="find-music">
    <el-tabs v-model="activeTabs" @tab-click="tabsClick">
      <el-tab-pane label="个性推荐" name="personalized">
        <div class="zm-personalized">
          <Personalized />
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="songList">
        <div class="zm-songlist">
          <router-view />
          <!-- <SongList /> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!-- <tabs>
      <tab-pane label="个性推荐" height="84vh">
        <div class="zm-personalized">
          <Personalized :source="source" />
        </div>
      </tab-pane>
      <tab-pane label="歌单">
        <div>这是歌单内容</div>
      </tab-pane>
      <tab-pane label="主播电台">
        <div>这是主播电台内容</div>
      </tab-pane>
      <tab-pane label="排行榜">
        <div>这是排行榜内容</div>
      </tab-pane>
      <tab-pane label="歌手">
        <div>这是歌手内容</div>
      </tab-pane>
      <tab-pane label="最新音乐">
        <div>这是最新音乐内容</div>
      </tab-pane>
    </tabs> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Personalized from './components/personailzed/Personalized.vue';
import SongList from './components/songList/index.vue';
export default defineComponent({
  name: 'findMusic',

  components: {
    Personalized,
    SongList,
  },
  setup() {
    const activeTabs = ref('songList');
    const router = useRouter();
    const tabsClick = tab => {
      console.log(tab.paneName);
      if (tab.paneName === 'songList') {
        router.push({
          path: 'findMusic/songList',
        });
      }
    };
    return {
      activeTabs,
      tabsClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.find-music {
  padding: 15px;
}

@include b(personalized) {
  padding-bottom: 30px;
  height: 84vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
    border-radius: 3px;
    padding: 3px 0;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

@include b(songlist) {
  @extend .zm-personalized;
}
</style>
