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
      <menu-group>
        <Menu :title="item.title" v-for="item in menuData" :key="item.id">
          <menu-item
            size="normal"
            :icon="item2.icon"
            :index="item2.index"
            :routeKey="item2.route"
            v-for="item2 in item.children"
            :key="item2.id"
          >
            {{ item2.label }}
          </menu-item>
        </Menu>
      </menu-group>
    </div>
    <div class="zm-home__main">
      <router-view v-slot="{ Component }">
        <transition :name="SkipSwitchName">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="zm-home__footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Header from './component/Header.vue';
import Footer from './component/Footer.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  setup() {
    const menuData = [
      {
        title: null,
        id: 1,
        children: [
          {
            id: 1,
            label: '发现音乐',
            route: 'findMusic',
            index: 1,
            icon: null,
          },
          {
            id: 2,
            label: '视频',
            route: 'video',
            index: 2,
            icon: null,
          },
          {
            id: 3,
            label: '朋友',
            route: 'friend',
            index: 3,
            icon: null,
          },
          {
            id: 4,
            label: '直播',
            route: 'live',
            index: 4,
            icon: null,
          },
          {
            id: 5,
            label: '私人FM',
            route: 'privateFM',
            index: 5,
            icon: null,
          },
        ],
      },
      {
        title: '我的音乐',
        id: 2,
        children: [
          {
            id: 6,
            label: '本地音乐',
            route: 'localMusic',
            index: 6,
            icon: 'yinyue',
          },
          {
            id: 7,
            label: '下载管理',
            route: 'downLoad',
            index: 7,
            icon: 'xiazai',
          },
          {
            id: 8,
            label: '我的音乐云盘',
            route: 'myCloud',
            index: 8,
            icon: 'yun',
          },
          {
            id: 9,
            label: '我的电台',
            route: 'myBroadcast',
            index: 9,
            icon: 'diantai',
          },
          {
            id: 10,
            label: '我的收藏',
            route: 'myCollect',
            index: 10,
            icon: 'shoucang',
          },
        ],
      },
      {
        title: '创建的歌单',
        id: 3,
        children: [
          {
            id: 11,
            label: '我喜欢的音乐',
            route: 'mylike',
            index: 11,
            icon: 'heart',
          },
          {
            id: 12,
            label: '廖子默的2020年度歌单',
            route: 'mylike',
            index: 12,
            icon: 'gedan',
          },
          {
            id: 13,
            label: '廖子默的2019年度歌单',
            route: 'mylike',
            index: 13,
            icon: 'gedan',
          },
        ],
      },
      {
        title: '收藏的歌单',
        id: 4,
        children: [
          {
            id: 14,
            label: 'Hanser唱的歌',
            route: 'mylike',
            index: 14,
            icon: 'gedan',
          },
          {
            id: 15,
            label: '[冷鸟集]',
            route: 'mylike',
            index: 15,
            icon: 'gedan',
          },
          {
            id: 16,
            label: '看书学习',
            route: 'mylike',
            index: 16,
            icon: 'gedan',
          },
        ],
      },
    ];

    const SkipSwitchName = ref('');
    const route = useRoute();

    watch(
      () => route.meta,
      (to: any, from: any) => {
        if (to.index > from.index) {
          SkipSwitchName.value = 'Skright';
        } else {
          SkipSwitchName.value = 'Skleft';
          console.log(11);
        }
      }
    );

    return {
      menuData,
      SkipSwitchName,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(home) {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: grid;
  grid-template-areas:
    'header header'
    'menu main'
    'footer footer';
  grid-template-columns: 12vw 88vw;
  grid-template-rows: 6vh 84vh 10vh;
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
    grid-area: footer;
    box-shadow: 0px -3px 3px 1px rgba(0, 0, 0, 0.1);
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
