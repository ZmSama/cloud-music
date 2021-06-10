<!--
 * @Description: 本地歌词面板
 * @Autor: ZmSama
 * @Date: 2021-06-08 11:15:10
-->

<template>
  <div class="zm-song-board">
    <div class="zm-song-board__cd">
      <!-- 针图片 -->
      <div class="needle">
        <img src="@/assets/img/neede.png" alt="" srcset="" />
      </div>
      <!-- dise -->
      <div class="disc">
        <img src="@/assets/img/disc.png" alt="" srcset="" />
        <div class="cover">
          <img src="@/assets/img/avater.jpg" alt="" srcset="" />
        </div>
      </div>
    </div>
    <div class="zm-song-board__song">
      <div class="name">寒衫浮梦</div>
      <div class="auth">双笙-寒衫浮梦</div>
    </div>
    <!-- 可视区域 -->
    <div class="zm-song-board__visibleView">
      <div class="zm-scroll-view" :style="curSty">
        <div
          class="zm-scroll-view__item"
          v-for="(i, index) in wordArr"
          :key="index"
          :class="curIndex == index && 'is-active'"
        >
          {{ i }}
        </div>
      </div>
    </div>
    <div class="zm-song-board__recommend">推荐列表</div>
    <div class="zm-song-board__comment">评论区域</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'LocalSongBoard',
  setup() {
    const wordArr = ref([
      '作词 : 菌上蚁',
      '作曲 : 阿坤',
      '编曲 : 简吟',
      '混音 : Mr.鱼',
      '笔落书卷半',
      '细呷温酒纸墨香',
      '痕迹潦潦 聆风旖旎',
      '画浮生一纸水青 未干',
      '念转凌霄权',
      '御笔不点寒白衫',
      '拂袖河山 纵笔江川',
      '赋此间一抹丹砂 清狂',
      '兰亭袅袅入凡尘',
      '行书以鉴当琼月',
      '锋毫冽冽提宫阙',
      '白绢为约伊人决',
      '苍鸟扶之青云兮',
      '青冢暮而依别离',
      '羁鹰坠羽寻芜兮',
      '封笔沉沙以伴渺娉',
      '伏案倾旧卷',
      '恍若入梦琴瑟婉',
      '尘中千叹 何人语堪',
      '惟作一介寒衫旧 轻叩',
      '清冽酒坛散',
      '一梦惊世长安仙',
      '浅吟轻唱 对错何妨',
      '唯记一点荧光青 微凉',
      '兰亭袅袅入凡尘',
      '行书以鉴当琼月',
      '锋毫冽冽提宫阙',
      '白绢为约伊人决',
      '苍鸟扶之青云兮',
      '青冢暮而依别离',
      '羁鹰坠羽寻芜兮',
      '封笔沉沙以伴娉婷',
      '渚江清清曳纸莲',
      '以寄天方姝旧还',
      '燕谷轻轻拙荆唤',
      '传以九幽何回荡',
      '倦眉蹙之终南兮',
      '风动玲心而愁忆',
      '悴鬓不觉缃素兮',
      '沧山映水流年何必',
      '终不见蛾眉轻舞霓裳 流袖翩跹',
    ]);

    const curIndex = ref(0);
    const clickMe = () => {
      curIndex.value++;
    };

    const curSty = computed(() => {
      if (curIndex.value > wordArr.value.length) {
        curIndex.value = 0;
      } else {
        return { top: -curIndex.value * 40 + 'px' };
      }
    });

    const startPlay = () => {
      setInterval(() => {
        curIndex.value++;
      }, 1000);
    };

    onMounted(() => {
      startPlay();
    });

    return {
      clickMe,
      wordArr,
      curIndex,
      curSty,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(song-board) {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    'song song song'
    'cd visibleView recommend'
    'comment comment comment';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 8vh 60vh 32vh;
  row-gap: 10px;
  column-gap: 10px;
  @include e(visibleView) {
    grid-area: visibleView;
    width: 100%;
    // width: 30vw;
    // height: 40vh;
    margin: 0 auto;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  @include e(cd) {
    grid-area: cd;
    @include jcc-aic;
    position: relative;
    .needle {
      width: 220px;
      height: 157px;
      position: absolute;
      left: 52%;
      transform-origin: left top;
      transform: rotate(20deg);
      top: 0;
      z-index: 999;
    }
    .disc {
      width: 480px;
      height: 480px;
      @include jcc-aic;
      animation: rotate 10s infinite linear;
      .cover {
        position: absolute;
        border-radius: 50%;
        overflow: hidden;
        width: 140px;
        height: 140px;
        z-index: 9;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  @include e(song) {
    grid-area: song;
    @include jcc-aic;
    flex-direction: column;
    .name {
      font-size: 28px;
    }
    .auth {
      margin-top: 5px;
      font-size: 14px;
      color: #ccc;
    }
  }
  @include e(comment) {
    grid-area: comment;
    background-color: greenyellow;
  }
  @include e(recommend) {
    grid-area: recommend;
    background-color: chartreuse;
  }
}

@include b(scroll-view) {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s all;
  @include e(item) {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    @include jcc-aic;
    transition: 0.3s all;
    @include when(active) {
      font-size: 26px;
      color: red;
    }
  }
}
</style>
