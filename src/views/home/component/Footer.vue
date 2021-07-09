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
        :style="{ 'background-image': 'url(' + curMusic?.pic + ')' }"
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
      <div class="song-info" v-show="curMusic">
        <div class="song-name" @click="likerClick">
          <span>{{ curMusic?.songName }}</span>
          <svg-icon name="heart" size="20"></svg-icon>
        </div>
        <div class="songer">
          <span>{{ curMusic?.art }}</span>
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
        <div class="pause-play">
          <svg-icon name="bofang1" size="25px" v-if="play" @click="playHandler"></svg-icon>
          <svg-icon name="bofang2" size="25px" v-else @click="playHandler"></svg-icon>
        </div>
        <div class="next-song">
          <svg-icon name="next" size="25px"></svg-icon>
        </div>
        <div class="song-word">词</div>
      </div>
      <div class="bottom">
        <div class="progress-area" @click.stop="clickProgressArea">
          <div class="progress-bar" ref="progressBar">
            <div class="dot" @mousedown.stop="draggerDot"></div>
          </div>
          <div class="progress-buff" ref="progressBuffBar"></div>
          <div class="timer">
            <span class="current">{{ current }}</span>
            <span class="duration">{{ duration }}</span>
          </div>
          <audio :src="curMusic?.url" ref="audioRef"></audio>
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

    <el-drawer
      v-model="isOpen"
      :withHeader="false"
      :show-close="false"
      direction="btt"
      size="100%"
      append-to-body
      @open="drawerOpen"
    >
      <div class="zm-hidden-board">
        <local-song-board :isOpen="isOpen" />
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue';
import Message from '@/components/message/src/message';
import LocalSongBoard from './LocalSongBoard.vue';
import { useStore } from '@/store/index';
import { useMusic } from '../hooks/useMusic';
import { ElMessage } from 'element-plus';
import { GET_SONG_WORD } from '@/api/modules/music';
import GloabTools from '@/utils/tools';
export default defineComponent({
  name: 'Footer',
  components: {
    LocalSongBoard,
  },
  setup() {
    const {
      playMusic,
      pauseMusic,
      isOpen,
      curIcon,
      index,
      timer,
      music,
      curMusic,
      duration,
      current,
      progressBar,
      progressBuffBar,
      clickProgressArea,
      draggerDot,
    } = useMusic();

    const store = useStore();
    const { formatLyric } = GloabTools();
    const audioRef = ref<HTMLAudioElement>();
    const isRender = ref(false);
    const { play, musicSource } = toRefs(store.state.playModel);
    curMusic.value = musicSource;
    // 打开歌词界面
    const openHandler = async () => {
      if (musicSource.value) {
        let res = await GET_SONG_WORD({ id: musicSource.value.id });
        if (res.data) {
          let lyric = formatLyric(res.data.lrc.lyric);
          // 将歌词设置到vuex
          store.commit('playModel/SET_SONG_LYRIC', lyric);
          setTimeout(() => {
            isOpen.value = true;
          }, 200);
        }
      } else {
        ElMessage({
          type: 'warning',
          message: '当前播放列表为空',
        });
      }
    };
    // 关闭歌词界面
    const closeHandler = () => {
      isOpen.value = false;
    };
    // 打开抽屉时的回调函数
    const drawerOpen = async () => {};
    const likerClick = () => {
      Message({
        type: 'info',
        duration: 2000,
        message: '添加成功,这是一个超级弹窗',
      });
    };

    const playHandler = () => {
      store.commit('playModel/TOGGLE_PLAY_PAUSE');
      if (play.value) {
        playMusic();
      } else {
        pauseMusic();
      }
    };

    onMounted(() => {
      isRender.value = true;
      if (isRender.value) {
        store.commit('playModel/SET_AUDIO_INSTANCE', audioRef.value);
      }
    });

    return {
      isOpen,
      curIcon,
      index,
      timer,
      music,
      curMusic,
      duration,
      current,
      audioRef,
      progressBar,
      progressBuffBar,
      openHandler,
      closeHandler,
      likerClick,
      playHandler,
      play,
      isRender,
      clickProgressArea,
      draggerDot,
      drawerOpen,
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
      object-fit: cover;
      background-size: contain;
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
        .progress-bar {
          width: 0;
          height: inherit;
          background: linear-gradient(90deg, #f6e58d 0%, #eb4d4b 100%);
          border-radius: inherit;
          z-index: 2;
          position: absolute;
          left: 0;
          top: 50%;
          pointer-events: none;
          transform: translateY(-50%);
          .dot {
            width: 10px;
            height: 10px;
            background: #e9dddd;
            border-radius: 50%;
            position: absolute;
            cursor: pointer;
            right: -5px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9;
          }
        }
        .progress-buff {
          height: inherit;
          background-color: rgba(0, 0, 0, 0.1);
          width: 0;
          position: absolute;
          left: 0;
          top: 50%;
          pointer-events: none;
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
