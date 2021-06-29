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
      <div class="zm-song-board__recommend">
        <div class="show-wrap">
          <span class="resource">播放来源：本地音乐</span>
          <div class="include-song-list">包含这首歌的歌单</div>
          <ul>
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
        <div class="type-name">全部评论（2167）</div>
        <ul>
          <li>
            <div class="icon">
              <img src="@/assets/img/avater.jpg" alt="" srcset="" />
            </div>
            <div class="commer-option">
              <div class="commer">
                <span class="user">十年树与花 :</span>
                <span class="comments">
                  这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错这首歌不错
                </span>
              </div>
              <div class="option">
                <span class="time">2015年1月16日 16:46</span>
                <div class="interraction">
                  <div class="start">
                    <svg-icon name="zan1" color="#ccc" size="15px"></svg-icon>
                    1026
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
          <li>
            <div class="icon">
              <img src="@/assets/img/avater.jpg" alt="" srcset="" />
            </div>
            <div class="commer-option">
              <div class="commer">
                <span class="user">遗憾循环 :</span>
                <span class="comments">
                  百里登风，皓月满空。。想起了那个叫月满空的大侠。第一次看还以为月满空就是主角，结果看的我目瞪口呆，没3分钟就挂了，还成了中国动漫史上第一位打马赛克的人物。。。
                </span>
              </div>
              <div class="option">
                <span class="time">2015年1月16日 16:46</span>
                <div class="interraction">
                  <div class="start">
                    <svg-icon name="zan1" color="#ccc" size="15px"></svg-icon>
                    1026
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
          <li v-for="i in 7" :key="i">
            <div class="icon">
              <img src="@/assets/img/avater.jpg" alt="" srcset="" />
            </div>
            <div class="commer-option">
              <div class="commer">
                <span class="user">少吃饭多吃肉 :</span>
                <span class="comments">
                  歌词围绕故事主角百里登风踏上江湖，寻找妻子汝嫣的故事主线，讲述了主人翁为了信念浪迹天涯，虽然一路艰险，但仍旧初心不改的心路历程。歌词中虽只字未提“情”之所在、“爱”之所寄，但字里行间流露出的跨越生死的牵挂，却体现出了汪苏泷的用‘’情‘’之深。——文字来源：网易娱乐
                </span>
              </div>
              <div class="option">
                <span class="time">2015年1月16日 16:46</span>
                <div class="interraction">
                  <div class="start">
                    <svg-icon name="zan1" color="#ccc" size="15px"></svg-icon>
                    1026
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
          <zm-pagination
            :total="page.total"
            :pageSize="page.size"
            :currentPage="page.index"
            @currentChange="changeHandler"
          />
          <!-- <zm-popper-button background="linear-gradient(90deg, #e67e22, #e74c3c)" size="mini">
            加载更多评论
          </zm-popper-button> -->
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
        <span class="song-name">寒衫浮梦</span>
        <span class="artist">双笙</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from '@/store/index';
import throttle from '@/utils/throttle';
import { GET_COUNTIRES_LIST } from '@/api/modules/base';
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
    const timer = ref(null);
    const store = useStore();
    const { play } = toRefs(store.state.playModel);
    const isBackTop = ref(false);
    const wrap = ref<HTMLElement>();
    const page = reactive({
      index: 1,
      size: 10,
      total: 300,
    });

    const clickMe = () => {
      curIndex.value++;
    };

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

    // 歌词滚动样式
    const curSty = computed(() => {
      if (curIndex.value > wordArr.value.length) {
        curIndex.value = 0;
      } else {
        return { top: -curIndex.value * 40 + 'px' };
      }
    });

    // cd动态样式
    const cdClass = computed(() => play.value && 'is-active');

    // 动态计算写个评论的位置
    const writeSty = computed(
      () => isBackTop.value && { right: '50%', bottom: '150px', transform: 'translateX(50%)' }
    );

    // 开始播放
    const startPlay = () => {
      timer.value = setInterval(() => {
        curIndex.value++;
      }, 1000);
    };

    // 暂停播放
    const stopPlay = () => {
      clearInterval(timer.value);
    };

    // 分页事件
    const changeHandler = val => {
      console.log(val);
    };

    const writeContent = async () => {
      let res = await GET_COUNTIRES_LIST();
      console.log(res);
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
    });
    watch(
      () => play,
      val => {
        if (val.value) {
          startPlay();
        } else {
          stopPlay();
        }
      },
      {
        deep: true,
      }
    );

    return {
      clickMe,
      wordArr,
      curIndex,
      curSty,
      cdClass,
      isBackTop,
      wrap,
      writeSty,
      gotoBackTop,
      changeHandler,
      page,
      writeContent,
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
    height: 70vh;
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
        width: 480px;
        height: 480px;
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
