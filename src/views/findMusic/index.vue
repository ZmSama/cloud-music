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
          <router-view name="personalized" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="songList">
        <div class="zm-songlist">
          <router-view />
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'findMusic',
  setup() {
    const activeTabs = ref('personalized');
    const router = useRouter();
    const tabsClick = tab => {
      console.log(tab.paneName);
      if (tab.paneName === 'songList') {
        router.push({
          name: 'SongList',
        });
      } else if (tab.paneName === 'personalized') {
        router.push({
          name: 'Personalized',
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
