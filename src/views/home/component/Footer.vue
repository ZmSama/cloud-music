<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-31 10:58:39
-->
<template>
  <div class="zm-footer">
    <!-- 歌词面板未展开状态 -->
    <div class="close-status" :class="{ 'close-up': isOpen }">
      <div
        class="cover"
        :style="{ 'background-image': 'url(' + curPlayPic + ')' }"
        @click="openHandler"
      >
        <!-- <img
          src="http://p4.music.126.net/AB-3WsIeCfDPkRyF_csLVQ==/109951165260265255.jpg?param=200y200"
          alt=""
        /> -->
        <div class="hover-icon">
          <svg-icon name="left_back" color="black" size="20px"></svg-icon>
        </div>
      </div>
      <div class="song-info">
        <div class="song-name" @click="likerClick">
          <span>问剑江湖</span>
          <svg-icon name="heart" size="20"></svg-icon>
        </div>
        <div class="songer">
          <span>双笙</span>
        </div>
      </div>
    </div>
    <!-- 歌词打开时 -->
    <div class="open-stauts" :class="{ 'open-up': isOpen }">
      <div class="cover" @click="closeHandler">
        <!-- 向上箭头 -->
        <div class="hover-icon"></div>
      </div>
      <div class="liker">
        <svg-icon name="heart-selected" size="20px"></svg-icon>
      </div>
      <div class="collector">
        <svg-icon name="shoucang" size="20px"></svg-icon>
      </div>
      <div class="download">
        <svg-icon name="xiazai" size="20px"></svg-icon>
      </div>
      <div class="more">
        <svg-icon name="fenxiang" size="20px"></svg-icon>
      </div>
    </div>

    <!-- 操作条 -->
    <div class="operate-wrap">
      <div class="top">
        <div class="play-mode">
          <svg-icon name="bofangye-caozuolan-suijibofang" size="25px"></svg-icon>
        </div>
        <div class="pre-song">
          <svg-icon name="prev" size="25px"></svg-icon>
        </div>
        <div class="pause-play" @click="playHandler">
          <svg-icon name="bofang2" size="25px" v-if="play"></svg-icon>
          <svg-icon name="bofang1" size="25px" v-else></svg-icon>
        </div>
        <div class="next-song">
          <svg-icon name="next" size="25px"></svg-icon>
        </div>
        <div class="song-word">词</div>
      </div>
      <div class="bottom">
        <div class="progress-area">
          <div class="progress-bar"></div>
          <div class="progress-buff"></div>
          <div class="timer">
            <span class="current">0:20</span>
            <span class="duration">3:40</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 选项条 -->
    <div class="option-wrap">
      <div class="voice">
        <svg-icon name="yinliang" size="25px"></svg-icon>
      </div>
      <div class="song-list">
        <svg-icon name="gedan" size="25px"></svg-icon>
      </div>
    </div>

    <!-- 单独的歌词面板 -->
    <drawer :visible="isOpen">
      <div class="zm-hidden-board">
        <local-song-board />
      </div>
    </drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import Message from '@/components/message/src/message';
import LocalSongBoard from './LocalSongBoard.vue';
import { useStore } from '@/store/index';

export default defineComponent({
  name: 'Footer',
  components: {
    LocalSongBoard,
  },
  setup() {
    const curPlayPic = ref(
      'http://p4.music.126.net/AB-3WsIeCfDPkRyF_csLVQ==/109951165260265255.jpg?param=200y200'
    );

    const isOpen = ref(false);
    const curIcon = ref('bofang2');
    const index = ref(0);
    const timer = ref(null);
    const store = useStore();
    const visible = ref(true);
    const { play } = toRefs(store.state.playModel);
    // 打开歌词界面
    const openHandler = () => {
      isOpen.value = true;
    };
    // 关闭歌词界面
    const closeHandler = () => {
      isOpen.value = false;
    };

    const likerClick = () => {
      Message({
        type: 'info',
        duration: 2000,
        message: '添加成功,这是一个超级弹窗',
      });
    };

    const playHandler = () => {
      store.commit('playModel/TOOGLE_PLAY_STATU');
    };

    const dotStyle = computed(() => {
      return {
        transform: `translate(${index.value}%,-50%)`,
      };
    });

    const barPlay = () => {
      timer.value = setInterval(() => {
        index.value++;
      }, 1000);
    };

    const barStop = () => {
      clearInterval(timer.value);
    };

    watch(
      () => play,
      val => {
        if (val.value) {
          barPlay();
          // console.log(111);
        } else {
          barStop();
        }
      },
      {
        deep: true,
      }
    );
    return {
      curPlayPic,
      isOpen,
      openHandler,
      closeHandler,
      likerClick,
      playHandler,
      curIcon,
      store,
      play,
      dotStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(footer) {
  height: 100%;
  width: 100%;
  user-select: none;
  background: #fff;
  // background-image: url('/src/assets/img/back.jpeg');
  @include jcc-aic-row;
  padding-left: 10px;
  overflow: hidden;
  position: relative;
  z-index: 2088;
  .close-status {
    @include jcc-aic-row;
    position: absolute;
    transition: 1s all;
    .cover {
      height: 70px;
      width: 70px;
      background-color: aqua;
      border-radius: 7px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover::after {
        opacity: 1;
      }
      &:hover .hover-icon {
        opacity: 1;
      }
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: inherit;
        filter: blur(2px);
        z-index: 2;
        transition: 0.3s;
        opacity: 0;
      }
      .hover-icon {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        @include jcc-aic;
        z-index: 3;
        transform: rotate(90deg);
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        transition: 0.3s all;
      }
    }
    .song-info {
      margin-left: 5px;
      font-size: 16px;
      .song-name {
        @include jcc-aic-row;
        cursor: pointer;
      }
    }
  }

  .open-stauts {
    height: 100%;
    width: 100%;
    @include jcc-aic-row;
    position: absolute;
    padding-left: 10px;
    transform: translateY(90px);
    transition: 1s all;
    .cover {
      height: 70px;
      width: 70px;
      border-radius: 7px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      @include jcc-aic;
      .hover-icon {
        height: 10px;
        width: 10px;
        transform: rotate(135deg);
        border: 3px solid rgba(0, 0, 0, 0.4);
        border-left: none;
        border-bottom: none;
      }
    }
    .liker {
      width: 43px;
      height: 43px;
      border: 1px solid #ccc;
      border-radius: 50%;
      @include jcc-aic;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        background-color: rgb(245, 245, 245);
      }
    }
    .collector {
      @extend .liker;
    }
    .download {
      @extend .liker;
    }
    .more {
      @extend .liker;
    }
  }

  .operate-wrap {
    width: 60vw;
    height: 100%;
    margin-left: 400px;
    @include jcc-aic;
    flex-direction: column;
    .top {
      width: 100%;
      height: 70%;
      @include jcc-aic;
      .play-mode {
        cursor: pointer;
      }
      .pre-song {
        margin-left: 30px;
        cursor: pointer;
      }
      .pause-play {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        @include jcc-aic;
        cursor: pointer;
        background-color: rgba(244, 244, 244, 0.6);
        margin-left: 30px;
        &:hover {
          background-color: rgba(244, 244, 244, 1);
        }
      }
      .next-song {
        cursor: pointer;
        margin-left: 30px;
      }
      .song-word {
        cursor: pointer;
        margin-left: 30px;
        cursor: pointer;
      }
    }
    .bottom {
      height: 30%;
      width: 100%;
      @include jcc-aic;
      font-size: 16px;
      color: #ccc;
      padding-bottom: 30px;
      box-sizing: border-box;
      .progress-area {
        width: 30vw;
        height: 6px;
        background-color: aliceblue;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
        .progress-bar {
          width: 60%;
          height: inherit;
          background: linear-gradient(90deg, #f6e58d 0%, #eb4d4b 100%);
          border-radius: inherit;
          z-index: 2;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            width: 10px;
            height: 10px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            background: rgb(14, 50, 233);
            opacity: 0;
            transition: 0.2s opacity;
          }
        }
        &:hover .progress-bar::after {
          opacity: 1;
        }
        .progress-buff {
          height: inherit;
          background-color: rgba(0, 0, 0, 0.1);
          width: 40%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          border-radius: inherit;
          z-index: 0;
        }
        .timer {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .option-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 18vw;
    .voice {
      margin-right: 30px;
      cursor: pointer;
    }
    .song-list {
      margin-right: 20px;
      cursor: pointer;
    }
  }

  // 添加两种相反的位置产生切换动画
  .open-up {
    transform: translateY(0);
  }
  .close-up {
    transform: translateY(-90px);
  }
}

@include b(song-panel) {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2021;
  box-sizing: border-box;
  overflow: hidden;
  @include e(title) {
    font-size: 30px;
    &:hover {
      color: gold;
    }
    @include m(primary) {
      color: red;
    }
  }
}

@include b(hidden-board) {
  width: 100vw;
  height: 90vh;
}

@keyframes animate {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}
</style>
