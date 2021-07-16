<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-10 16:47:42
-->
<template>
  <div class="zm-home">
    <div class="zm-home__header">
      <Header />
    </div>
    <div class="zm-home__menu">
      <el-menu default-active="1">
        <el-menu-item index="1">
          <template #title>发现音乐</template>
        </el-menu-item>
        <el-menu-item index="2">
          <template #title>视频</template>
        </el-menu-item>
        <el-menu-item index="3">
          <template #title>朋友</template>
        </el-menu-item>
        <el-menu-item index="4">
          <template #title>直播</template>
        </el-menu-item>
        <el-menu-item index="5" v-if="info">
          <template #title>私人FM</template>
        </el-menu-item>
        <el-submenu index="6">
          <template #title>
            <span>我的音乐</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1">
              <i class="iconfont icon-yinyue"></i>
              本地音乐
            </el-menu-item>
            <el-menu-item index="6-2">
              <i class="iconfont icon-xiazai1"></i>
              下载管理
            </el-menu-item>
            <el-menu-item index="6-3">
              <i class="iconfont icon-rili2"></i>
              最近播放
            </el-menu-item>
            <template v-if="info">
              <el-menu-item index="6-4">
                <i class="iconfont icon-yun"></i>
                我的音乐云盘
              </el-menu-item>
              <el-menu-item index="6-5">
                <i class="iconfont icon-diantai"></i>
                我的电台
              </el-menu-item>
              <el-menu-item index="6-6">
                <i class="iconfont icon-shoucang"></i>
                我的收藏
              </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template #title>
            <span>创建的歌单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(item, index) in createList"
              :key="item.id"
              :index="'7-' + (index + 1)"
            >
              <i class="iconfont icon-gedan"></i>
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8" v-if="info">
          <template #title>
            <span>收藏的歌单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(item, index) in collectList"
              :key="item.id"
              :index="'8-' + (index + 1)"
            >
              <i class="iconfont icon-gedan"></i>
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="zm-home__main">
      <router-view v-slot="{ Component }" v-if="isRouterAlive">
        <transition :name="SkipSwitchName">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="zm-home__footer" :style="playFooter">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, provide, nextTick, toRefs, computed, reactive } from 'vue';
import Header from './component/Header.vue';
import Footer from './component/Footer.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/index';
import { GET_USER_SONG_LIST } from '@/api/modules/user';
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  setup() {
    const state = reactive({
      SkipSwitchName: '',
      isRouterAlive: true,
      createList: [],
      collectList: [],
    });
    const route = useRoute();
    const store = useStore();

    const { play } = toRefs(store.state.playModel);
    const { info } = toRefs(store.state.userModel);

    // 得到左侧导航的数据（需要登陆），且这里是左侧导航，值渲染前30条数据
    const getMenuData = async (uid: number) => {
      let res = await GET_USER_SONG_LIST({ uid });
      if (res.data) {
        let playlist = res.data.playlist as any[];
        // 将里面的创建歌单找出来
        state.createList = playlist.filter(item => !item.subscribed);
        // 把收藏歌单找出来
        state.collectList = playlist.filter(item => item.subscribed);
      }
    };

    // 重置路由（界面）
    const reloadRouter = () => {
      state.isRouterAlive = false;
      nextTick(() => (state.isRouterAlive = true));
    };
    const playFooter = computed(() => play.value && { transform: 'translateY(0)' });

    provide('reload', reloadRouter);
    watch(
      () => route.meta,
      (to: any, from: any) => {
        if (to.index > from.index) {
          state.SkipSwitchName = 'Skright';
        } else {
          state.SkipSwitchName = 'Skleft';
        }
      }
    );

    watch(
      () => info.value,
      val => {
        if (val) {
          getMenuData(val.id);
        }
      }
    );
    return {
      ...toRefs(state),
      playFooter,
      info,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(home) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    'header header'
    'menu main';
  grid-template-columns: 12vw 88vw;
  grid-template-rows: 6vh 94vh;
  position: relative;
  @include e(header) {
    grid-area: header;
  }
  @include e(menu) {
    grid-area: menu;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0);
      border-radius: 3px;
      padding: 3px 0;
    }
    border-right: 1px solid #ccc;

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  @include e(main) {
    grid-area: main;
    // border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 10px;
  }
  @include e(footer) {
    cursor: pointer;
    position: absolute;
    background: red;
    left: 0;
    bottom: 0px;
    height: 10vh;
    width: 100vw;
    box-shadow: 0px -3px 3px 1px rgba(0, 0, 0, 0.1);
    transform: translateY(80%);
    transition: 0.8s transform;
    z-index: 99999;
    &:hover {
      transform: translateY(0);
    }
  }
}

.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Skleft-leave-active {
  transition: all 600ms;
  opacity: 0;
}
.Skright-enter {
  transform: translate3d(-10%, 0, 0);
}
.Skright-leave-to {
  transform: translate3d(10%, 0, 0);
}
.Skleft-enter {
  transform: translate3d(10%, 0, 0);
}
.Skleft-leave-to {
  transform: translate3d(-10%, 0, 0);
}
</style>
