<!--
 * @Description: 个性推荐部分
 * @Autor: ZmSama
 * @Date: 2021-05-28 16:32:01
-->
<template>
  <div class="swiper-wrap">
    <swiper :initial="2" :interval="3000" :auto="true">
      <slider v-for="item in source" :key="item.id">
        <img :src="item.pic" alt="" srcset="" />
      </slider>
    </swiper>
  </div>

  <!-- 推荐歌单 -->
  <div class="zm-recommend">
    <zm-button @click="clickHandler">推荐歌单</zm-button>
    <div class="recommend-list">
      <div class="list-item" v-for="item in source" :key="item.id">
        <div class="cover-img">
          <img :src="item.pic" alt="55555" :title="item.des" />
          <div class="icon">
            <svg-icon name="bofang" size="30" color="red"></svg-icon>
          </div>
          <div class="play-num">
            <svg-icon name="bofang"></svg-icon>
            <span>11万</span>
          </div>
        </div>
        <div class="description">
          <span>{{ item.des }}</span>
        </div>
      </div>
    </div>
  </div>

  <!--独家放送 -->
  <div class="zm-exclusive">
    <zm-button>独家放送</zm-button>
    <div class="zm-exclusive-list">
      <div class="zm-exclusive-list__item">
        <div class="cover-img">
          <img
            src="http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200"
          />
        </div>
        <div class="description">
          <span>超级面对面</span>
        </div>
      </div>
      <div class="zm-exclusive-list__item">
        <div class="cover-img">
          <img
            src="http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200"
          />
        </div>
        <div class="description">
          <span>超级面对面</span>
        </div>
      </div>
      <div class="zm-exclusive-list__item">
        <div class="cover-img">
          <img
            src="http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200"
          />
        </div>
        <div class="description">
          <span>超级面对面</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 最新音乐 -->
  <div class="zm-new-song">
    <zm-button>最新音乐</zm-button>
    <div class="zm-new-song-list">
      <div class="zm-new-song-list__item" v-for="i in 12" :key="i">
        <div class="cover">
          <img
            src="http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200"
            alt=""
            srcset=""
          />
        </div>
        <div class="song-name">初恋</div>
        <div class="singer">莫文蔚</div>
      </div>
    </div>
  </div>

  <!-- 推荐mv -->
  <div class="zm-recommend-mv">
    <zm-button>推荐MV</zm-button>
    <div class="zm-recommend-mv-list">
      <recommend-mv-item />
      <recommend-mv-item />
      <recommend-mv-item />
    </div>
  </div>
</template>

<script lang="ts">
import ZmButton from '@/components/button/ZmButton.vue';
import { defineComponent, ref } from 'vue';
import RecommendMvItem from './RecommendMvItem.vue';
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
    const source = ref([
      {
        id: 1,
        pic: 'http://p3.music.126.net/GgAZIFuvNmTQNqelaVEoew==/109951166040896117.jpg?param=200y200',
        des: '让这甜甜的歌单来缓解你一天的疲惫让我们一起陪伴你，在你一个人的时候',
      },
      {
        id: 2,
        pic: 'http://p4.music.126.net/YCy9Pw8-sgzr895nzeVLkQ==/109951166029803859.jpg?param=200y200',
        des: '温柔的暖风一定能吹散很多的不愉快',
      },
      {
        id: 3,
        pic: 'http://p3.music.126.net/o2o8w3fNGLyLXghtpq2nCA==/109951165926666028.jpg?param=200y200',
        des: '海上月是天上月，眼前人是心上人，',
      },
      {
        id: 4,
        pic: 'http://p4.music.126.net/XQlI-cyn4ip07RGt1Fqqcw==/109951162837149540.jpg?param=200y200',
        des: '无非在做两件事情：谋生，谋爱！',
      },
      {
        id: 5,
        pic: 'http://p4.music.126.net/QOWiQGhR6Tg0pOry_M0WIA==/109951165620939851.jpg?param=200y200',
        des: '没有钱委屈肉身，没有爱折磨灵魂。',
      },
      {
        id: 6,
        pic: 'http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200',
        des: '听着听着便走了神，陷入回忆，幸又长了几岁，不然差点落下泪来',
      },
      {
        id: 7,
        pic: 'http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200',
        des: '听着听着便走了神，陷入回忆，幸又长了几岁，不然差点落下泪来',
      },
      {
        id: 8,
        pic: 'http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200',
        des: '听着听着便走了神，陷入回忆，幸又长了几岁，不然差点落下泪来',
      },
      {
        id: 9,
        pic: 'http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200',
        des: '听着听着便走了神，陷入回忆，幸又长了几岁，不然差点落下泪来',
      },
      {
        id: 10,
        pic: 'http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200',
        des: '听着听着便走了神，陷入回忆，幸又长了几岁，不然差点落下泪来',
      },
    ]);
    const clickHandler = () => {
      console.log(111);
    };

    return {
      clickHandler,
      source,
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
      .cover-img {
        height: 85%;
        width: 100%;
        background-color: aqua;
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
