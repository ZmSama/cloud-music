<!--
 * @Description: 本地歌词面板
 * @Autor: ZmSama
 * @Date: 2021-06-08 11:15:10
-->

<template>
  <div class="wrap" ref="wrap">
    <div class="zm-song-board">
      <div class="zm-song-board__cd" :class="cdClass">
        <!-- 针图片 -->
        <div class="needle">
          <img src="@/assets/img/neede.png" alt="" srcset="" />
        </div>
        <!-- dise -->
        <div class="disc">
          <img src="@/assets/img/disc.png" alt="" srcset="" />
          <div class="cover">
            <img :src="musicSource?.pic" alt="" srcset="" />
          </div>
        </div>
      </div>
      <div class="zm-song-board__song">
        <div class="name">{{ musicSource?.songName }}</div>
        <div class="auth">{{ musicSource?.art }}</div>
      </div>
      <!-- 可视区域 -->
      <div class="zm-song-board__visibleView">
        <div class="zm-scroll-view" :style="lyricMove">
          <div
            class="zm-scroll-view__item"
            v-for="(i, index) in musicSource.lyric"
            :key="index"
            :class="currentRow == index && 'is-active'"
          >
            {{ i.text }}
          </div>
        </div>
      </div>
      <div class="zm-song-board__recommend">
        <div class="show-wrap">
          <!-- <span class="resource">播放来源：本地音乐</span> -->
          <div class="include-song-list">相似歌曲</div>
          <ul v-loading="loading_simi">
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">睡觉听歌</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">高考国考考研刷题专用轻音乐，谁用谁知道，直接起飞</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">睡觉听歌</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">睡觉听歌</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">睡觉听歌</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">睡觉听歌</span>
            </li>
          </ul>
          <div class="include-song-list">喜欢这首歌的人也听</div>
          <ul>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">半城烟沙-许嵩</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">三国杀-汪苏泷</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">三国杀-汪苏泷</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">三国杀-汪苏泷</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">三国杀-汪苏泷</span>
            </li>
            <li>
              <div class="icon">
                <img src="@/assets/img/avater.jpg" alt="" srcset="" />
              </div>
              <span class="song-name">三国杀-汪苏泷</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="zm-comment">
      <div class="all-comment">
        <div class="type-name">{{ `全部评论（${total}）` }}</div>
        <ul v-loading="loading">
          <li v-for="item in comments" :key="item.commentId">
            <div class="icon">
              <img :src="item.user?.avatarUrl" alt="" srcset="" />
            </div>
            <div class="commer-option">
              <div class="commer">
                <span class="user">{{ item.user.nickname }} :</span>
                <span class="comments">
                  {{ item.content }}
                </span>
                <div class="comment-append" v-if="item.beReplied.length > 0">
                  <span class="comment-append__user">
                    {{ '@' + item?.beReplied[0].user.nickname }}
                  </span>
                  <span>{{ item?.beReplied[0].content }}</span>
                </div>
              </div>
              <div class="option">
                <span class="time">{{ commentDateFormat(item.time) }}</span>
                <div class="interraction">
                  <div class="start">
                    <svg-icon name="zan1" color="#ccc" size="15px"></svg-icon>
                    {{ item.likedCount }}
                  </div>
                  <div class="share">
                    <svg-icon name="fenxiang" color="#ccc" size="15px"></svg-icon>
                  </div>
                  <div class="write">
                    <svg-icon name="pinglunyuanxingx" color="#ccc" size="15px"></svg-icon>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="load-more">
          <el-pagination
            background
            hide-on-single-page
            @current-change="paginateHandle"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="write-comment" :style="writeSty">
      <a href="#" @click="writeContent">写个评论</a>
    </div>
    <div class="backTop" v-show="isBackTop" @click="gotoBackTop">
      <svg-icon name="bofang2" size="25"></svg-icon>
    </div>
    <!-- 滚动条有时悬浮的歌名和作者 -->
    <transition name="top-fade">
      <div class="sone-name" v-show="isBackTop">
        <span class="song-name">{{ musicSource?.songName }}</span>
        <span class="artist">{{ musicSource?.art }}</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from '@/store/index';
import throttle from '@/utils/throttle';
import { GET_COUNTIRES_LIST } from '@/api/modules/base';
import { GET_SONG_COMMENT, GET_SIMI_SONG } from '@/api/modules/music';
import GloabTools from '@/utils/tools';
export default defineComponent({
  name: 'LocalSongBoard',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
    },
  },
  setup(props) {
    const curIndex = ref(0);
    const currentRow = ref(0);
    const lyricMove = ref({ top: '0' });
    const store = useStore();
    const { commentDateFormat } = GloabTools();
    const { play, musicSource, currentTime } = toRefs(store.state.playModel);
    const isBackTop = ref(false);
    const wrap = ref<HTMLElement>();
    const page = reactive({
      index: 1,
      size: 10,
      total: 300,
    });

    const comments = ref([]);
    const simiSource = ref([]);
    const loading = ref(false);
    const loading_simi = ref(false);

    // 点击返回页面顶部
    const gotoBackTop = () => {
      let scrollTop = wrap.value.scrollTop;
      let timer = setInterval(() => {
        scrollTop -= 40;
        wrap.value.scrollTo(0, scrollTop);
        if (scrollTop <= 0) {
          clearInterval(timer);
        }
      }, 16.7);
      isBackTop.value = false;
    };

    // cd动态样式
    const cdClass = computed(() => play.value && 'is-active');

    // 动态计算写个评论的位置
    const writeSty = computed(
      () => isBackTop.value && { right: '50%', bottom: '150px', transform: 'translateX(50%)' }
    );

    // 得到评论
    const getCommentList = async () => {
      loading.value = true;
      let res = await GET_SONG_COMMENT({
        id: musicSource.value.id,
        limit: page.size,
        offset: page.index,
      });
      if (res.data) {
        loading.value = false;
        comments.value = res.data.comments;
        page.total = res.data.total;
      }
    };

    // 得到相似歌曲
    const getSimiSong = async () => {
      loading_simi.value = true;
      let res = await GET_SIMI_SONG({ id: musicSource.value.id });
      if (res.data) {
        loading_simi.value = false;
        simiSource.value = res.data.songs;
      }
    };

    // 分页事件
    const paginateHandle = val => {
      page.index = val;
      getCommentList();
    };

    const writeContent = async () => {
      let res = await GET_COUNTIRES_LIST();
    };

    // 页面加载完毕时为当前页面绑定滚动事件完成一些界面的UI交互效果
    onMounted(() => {
      wrap.value.addEventListener(
        'scroll',
        throttle((e: Event) => {
          let scrollTop = e.target['scrollTop'];
          if (scrollTop > 190) {
            isBackTop.value = true;
          } else {
            isBackTop.value = false;
          }
        })
      );

      getCommentList();
      getSimiSong();
    });
    watch(
      () => currentTime.value,
      val => {
        musicSource.value.lyric.forEach((item, index) => {
          if (val >= item.time) {
            lyricMove.value.top = -index * 40 + 'px';
            currentRow.value = index;
          }
        });
      }
    );
    return {
      curIndex,
      cdClass,
      isBackTop,
      wrap,
      writeSty,
      gotoBackTop,
      paginateHandle,
      ...toRefs(page),
      writeContent,
      musicSource,
      lyricMove,
      currentRow,
      loading,
      comments,
      commentDateFormat,
      loading_simi,
    };
  },
});
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
  overflow: auto;
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
  @include b(song-board) {
    width: 100%;
    height: 80vh;
    display: grid;
    grid-template-areas:
      'song song song'
      'cd visibleView recommend';
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 8vh 60vh;
    row-gap: 10px;
    column-gap: 10px;
    background: linear-gradient(180deg, rgb(243, 232, 235), #fff);
    overflow: auto;
    @include e(visibleView) {
      grid-area: visibleView;
      // z-index: 2;
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
        transform: rotate(0deg);
        top: 0;
        z-index: 999;
        transition: 0.4s all;
      }
      .disc {
        width: 400px;
        height: 400px;
        border-radius: 50%;
        position: absolute;
        @include jcc-aic;
        .cover {
          position: absolute;
          border-radius: 50%;
          overflow: hidden;
          width: 140px;
          height: 140px;
          z-index: 9;
        }
      }

      @include when(active) {
        .disc {
          animation: rotate 10s infinite linear;
          transform-origin: center;
        }
        .needle {
          transform: rotate(20deg);
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
    @include e(recommend) {
      grid-area: recommend;
      @include jcc-aic;
      flex-direction: column;
      .show-wrap {
        height: 100%;
        width: 400px;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
        box-shadow: 0 0 3px -3px 3px #fff;
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
        .resource {
          font-size: 14px;
          color: rgba($color: #000000, $alpha: 0.8);
        }
        .include-song-list {
          margin-top: 10px;
          font-weight: 600;
          font-size: 16px;
        }
        ul {
          padding: 0;
          margin: 0;
          li {
            list-style: none;
            margin: 0 10px;
            padding: 5px;
            height: 50px;
            @include jcc-aic-row;
            border-radius: 6px;
            cursor: pointer;
            .icon {
              width: 40px;
              height: 40px;
              border-radius: 6px;
              overflow: hidden;
            }
            .song-name {
              font-size: 14px;
              width: 80%;
              color: rgba($color: #000000, $alpha: 0.8);
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1; //这里控制多少行
              margin-left: 10px;
            }
            &:hover {
              background: rgba($color: #000000, $alpha: 0.1);
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  @include b(comment) {
    // background-color: greenyellow;
    @include jcc-aic;
    flex-direction: column;
    width: 100%;

    .all-comment {
      width: 50%;
      margin-top: 10px;
      padding: 20px;
      box-sizing: border-box;
      .type-name {
        font-size: 16px;
        font-weight: 600;
      }
      ul {
        padding: 0;
        margin: 0;
        li {
          list-style: none;
          margin-top: 10px;
          @include jcc-aic-row;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px 0;
          &:last-child {
            border-bottom: none;
          }
          .icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          .commer-option {
            width: 92%;
            margin-left: 20px;
            @include jcc-aic;
            flex-direction: column;
            .commer {
              width: 100%;
              .user {
                color: rgba(36, 149, 206, 0.9);
              }
              .comments {
                font-size: 15px;
              }
              .comment-append {
                margin-top: 10px;
                margin-bottom: 10px;
                font-size: 14px;
                border-radius: 4px;
                padding: 10px;
                background-color: rgb(234, 233, 233);
                .comment-append__user {
                  color: rgba(36, 149, 206, 0.9);
                  padding-right: 5px;
                }
              }
            }
            .option {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .time {
                margin-top: 5px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.3);
              }
              .interraction {
                @include jcc-aic-row;
                .start {
                  cursor: pointer;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.3);
                }
                .share {
                  margin-left: 15px;
                  cursor: pointer;
                }
                .write {
                  margin-left: 15px;
                  cursor: pointer;
                }
              }
            }
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .load-more {
        width: 100%;
        @include jcc-aic;
      }
    }
  }

  .write-comment {
    position: absolute;
    bottom: 120px;
    right: 250px;
    transition: 0.4s all;
    a {
      text-decoration: none;
      text-align: center;
      padding: 10px 30px;
      border-radius: 26px;
      z-index: 99;
      transition: 1s all;
      box-shadow: 5px 3px 12px 2px #ccc;
      background-color: #fff;
      &:hover {
        background-color: red;
        color: #fff;
      }
    }
  }

  .backTop {
    position: absolute;
    bottom: 106px;
    right: 150px;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;
    transition: 0.3s;
    @include jcc-aic;
    transform: rotate(-90deg);
    cursor: pointer;
    &:hover {
      background-color: rgb(187, 181, 181);
    }
  }
  .sone-name {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    background: rgb(245, 236, 239);
    transition: 1s all;
    @include jcc-aic;
    flex-direction: column;
    .song-name {
      color: rgba(0, 0, 0, 0.7);
    }
    .artist {
      margin-top: 10px;
      color: #ccc;
      font-size: 14px;
    }
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

.top-fade-enter-form,
.top-fade-leave-to {
  opacity: 0;
  height: 0;
  overflow: hidden;
}
.top-fade-enter-to,
.top-fade-leave-form {
  opacity: 1;
  height: 60px;
}
</style>
