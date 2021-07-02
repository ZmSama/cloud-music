<!--
 * @Description: 个性推荐部分
 * @Autor: ZmSama
 * @Date: 2021-05-28 16:32:01
-->
<template>
  <div class="swiper-wrap">
    <swiper :initial="1" :interval="3000" :auto="true" v-if="bannerList.length > 0">
      <slider v-for="item in bannerList" :key="item.bannerId">
        <img :src="item.pic" alt="" srcset="" />
      </slider>
    </swiper>
  </div>

  <!-- 推荐歌单 -->
  <div class="zm-recommend">
    <zm-button @click="clickHandler">推荐歌单</zm-button>
    <div class="recommend-list" v-loading="loading" zm-loading-text="正在加载...">
      <div class="list-item">
        <div class="cover-img">
          <span class="today-rec__text">根据您的音乐口味生成每日更新</span>
          <span class="today-rec">{{ judgeTodayNum() }}</span>
          <svg-icon name="rili2" size="170px"></svg-icon>
          <div class="icon">
            <svg-icon name="bofang" size="30" color="red"></svg-icon>
          </div>
          <div class="play-num">
            <!-- <svg-icon name="bofang"></svg-icon> -->
            <!-- <span>11万</span> -->
          </div>
        </div>
        <div class="description">
          <span>每日歌曲推荐</span>
        </div>
      </div>
      <div class="list-item" v-for="item in recomendList" :key="item.id">
        <div class="cover-img">
          <img :src="item.picUrl" alt="55555" :title="item.des" />
          <div class="icon">
            <svg-icon name="bofang" size="30" color="red"></svg-icon>
          </div>
          <div class="play-num">
            <svg-icon name="bofang"></svg-icon>
            <span>{{ judgePayCount(item.playCount) }}</span>
          </div>
        </div>
        <div class="description">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>

  <!--独家放送 -->
  <div class="zm-exclusive">
    <zm-button>独家放送</zm-button>
    <div class="zm-exclusive-list">
      <div class="zm-exclusive-list__item" v-for="item in personalied" :key="item.id">
        <div class="cover-img">
          <img :src="item.sPicUrl" />
        </div>
        <div class="description">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 最新音乐 -->
  <div class="zm-new-song">
    <zm-button>最新音乐</zm-button>
    <div class="zm-new-song-list">
      <div class="zm-new-song-list__item" v-for="item in newRecommandSong" :key="item.id">
        <div class="cover">
          <img :src="item.picUrl" alt="" srcset="" />
        </div>
        <div class="song-name">{{ item.name }}</div>
        <div class="singer">{{ judgeArist(item.song.artists) }}</div>
      </div>
    </div>
  </div>

  <!-- 推荐mv -->
  <div class="zm-recommend-mv">
    <zm-button>推荐MV</zm-button>
    <div class="zm-recommend-mv-list">
      <recommend-mv-item v-for="item in recommandMV" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import ZmButton from '@/components/button/ZmButton.vue';
import { defineComponent, ref } from 'vue';
import RecommendMvItem from './RecommendMvItem.vue';
import Tools from '../utils/index';
import GloabTools from '@/utils/tools';
import useApiData from '../hooks/useApiData';
import { ZmLoading } from '@/components';
export default defineComponent({
  components: { ZmButton, RecommendMvItem },
  name: 'Personalized',
  props: {
    source: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const loading = ref(false);
    const { judgeArist, judgeTodayNum } = Tools();
    const { judgePayCount } = GloabTools();
    const {
      getBannerData,
      getPersonalizedData,
      getRecommandData,
      getNewRecommandSongData,
      getRecommandMV,
      bannerList,
      recomendList,
      recommandMV,
      newRecommandSong,
      personalied,
    } = useApiData();

    const clickHandler = () => {
      console.log(111);
      loading.value = !loading.value;

      // ZmLoading.service({
      //   background: 'rgba(0,0,0,0.5)',
      // });
    };

    getBannerData();
    getPersonalizedData();
    getRecommandData();
    getNewRecommandSongData();
    getRecommandMV();
    return {
      bannerList,
      recomendList,
      recommandMV,
      newRecommandSong,
      personalied,
      judgeArist,
      judgePayCount,
      judgeTodayNum,
      clickHandler,
      loading,
    };
  },
});
</script>
<style lang="scss" scoped>
.swiper-wrap {
  position: relative;
  width: 100%;
  height: 350px;
  // background-color: #ccc;
}

@include b(recommend) {
  .recommend-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 30px;
    column-gap: 30px;
    padding: 10px;
    .list-item {
      height: 330px;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      &:first-child .cover-img {
        @include jcc-aic;
        z-index: 1;
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          /* 从父元素继承 background 属性的设置 */
          background: linear-gradient(360deg, rgb(48, 98, 120), rgb(100, 86, 84));
          filter: blur(2px);
          z-index: -1;
        }
        &:hover .today-rec__text {
          top: 0;
        }
        .today-rec {
          position: absolute;
          color: #fff;
          font-weight: 600;
          font-size: 80px;
          top: 60%;
          transform: translateY(-50%);
          z-index: 1;
        }
        .today-rec__text {
          width: 100%;
          position: absolute;
          top: -40px;
          left: 0;
          display: inline-block;
          height: 40px;
          background: rgba(0, 0, 0, 0.3);
          font-size: 14px;
          color: #fff;
          @include jcc-aic;
          z-index: 3;
          transition: 0.4s all;
        }
      }
      .cover-img {
        height: 85%;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        &:hover .icon {
          opacity: 1;
        }
        .icon {
          z-index: 3;
          position: absolute;
          bottom: 10px;
          @include jcc-aic;
          width: 40px;
          height: 40px;
          right: 10px;
          background-color: #fff;
          border-radius: 50%;
          opacity: 0;
        }
        .play-num {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .description {
        @include jcc-aic;
        height: 40px;
        padding: 5px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //这里控制多少行
        opacity: 0.6;
        transition: 0.3s;
        &:hover {
          opacity: 1;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@include b(exclusive) {
  margin: 20px 0;
}

@include b(exclusive-list) {
  @include jcc-aic-row;
  @include e(item) {
    flex: 1;
    .cover-img {
      border-radius: 10px;
      cursor: pointer;
      overflow: hidden;
      width: 500px;
      height: 250px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}

@include b(new-song) {
  margin-top: 20px;
}

@include b(new-song-list) {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
  cursor: pointer;
  @include e(item) {
    width: 100%;
    height: 100px;
    display: grid;
    border-radius: 10px;
    overflow: hidden;
    grid-template-areas:
      'cover song-name'
      'cover singer';
    grid-template-columns: 1fr 4fr;
    transition: 0.1s all;
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
    .cover {
      grid-area: cover;
      background-color: red;
      border-radius: 10px;

      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .song-name {
      grid-area: song-name;
      padding: 15px 0px 0 5px;
      box-sizing: border-box;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; //这里控制多少行
      height: 40px;
    }
    .singer {
      grid-area: singer;
      padding: 0 0 10px 5px;
      font-size: 16px;
      color: rgba($color: #000000, $alpha: 0.3);
    }
  }
}

@include b(recommend-mv) {
  margin-top: 20px;

  @include b(recommend-mv-list) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
  }
}
</style>
