<!--
 * @Description: 歌单组件
 * @Autor: ZmSama
 * @Date: 2021-07-12 15:06:34
-->
<template>
  <div
    class="top-card"
    :style="{
      background: 'url(' + qualityList[0].coverImgUrl + ')',
      'background-repeat': 'no-repeat',
      'background-size': '120%',
    }"
    v-if="isQuality && qualityList.length > 0"
  >
    <div class="cover">
      <img :src="qualityList[0].coverImgUrl" alt="" />
    </div>
    <div class="info">
      <div class="inbutton" @click="toHeightQuality">
        <i class="iconfont icon-VIP"></i>
        <span>精品歌单</span>
      </div>
      <div class="title">
        <span>{{ qualityList[0].name }}</span>
      </div>
      <div class="des">
        <span>{{ qualityList[0].copywriter }}</span>
      </div>
    </div>
  </div>
  <div class="operate-wrap">
    <el-popover placement="right" v-model:visible="isShow" width="40vw" trigger="click">
      <template #reference>
        <div class="select-button">
          <span>{{ curType }}</span>
          <i class="iconfont icon-youfanhui01"></i>
        </div>
      </template>
      <song-type-card @select-change="typeSelect" v-model="curType" />
    </el-popover>
    <!-- <div class="select-item">
      <div class="item is-active">
        <span>华语</span>
      </div>
      <div class="item">
        <span>流行</span>
      </div>
    </div> -->
  </div>
  <div class="song-list" v-loading="loading">
    <div class="list-item" v-for="i in playList" :key="i.id">
      <div class="item-cover">
        <img :src="i.coverImgUrl" alt="" />
        <div class="play-num">
          <i class="iconfont icon-bofang2"></i>
          <span>{{ judgePayCount(i.playCount) }}</span>
        </div>
        <div class="auth">
          <i class="iconfont icon-ren"></i>
          <el-tooltip class="item" effect="dark" :content="i.creator.nickname" placement="bottom">
            <span>{{ i.creator.nickname }}</span>
          </el-tooltip>
          <!-- <i class="iconfont icon-qq"></i> -->
        </div>
      </div>
      <div class="list-des">{{ i.description }}</div>
    </div>
  </div>
  <div class="pagination">
    <el-pagination
      background
      hide-on-single-page
      layout="prev, pager, next"
      :total="page.total"
      :page-size="page.size"
      @current-change="paginateHandle"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import songTypeCard from './components/songTypeCard.vue';
import {
  GET_SONG_LIST,
  GET_SONG_LIST_TYPE_HIGHT_QUALITY,
  GET_SONG_LIST_HEIGHT_QUALITY,
} from '@/api/modules/music';
import GloabTools from '@/utils/tools';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'SongList',
  components: {
    songTypeCard,
  },
  setup() {
    const state = reactive({
      curType: '全部',
      page: {
        index: 1,
        total: 0,
        size: 60,
      },
      playList: [],
      isShow: false,
      loading: false,
      isQuality: false,
      qualityTypeList: [],
      qualityList: [],
    });
    const { judgePayCount } = GloabTools();
    const router = useRouter();

    // 选择歌单类型
    const typeSelect = val => {
      if (val === 'all') {
        getListByType('');
      } else {
        getListByType(val);
      }
      // 选择一个类型时查看是否存在精品系列
      state.isQuality = state.qualityTypeList.some(item => item.name === val);
      if (state.isQuality) {
        getHeightQualityList(val);
      }
      state.isShow = false;
    };

    // 根据类型得到歌单列表
    const getListByType = async (type: string) => {
      state.loading = true;
      let res = await GET_SONG_LIST({
        cat: type,
        limit: state.page.size,
        offset: state.page.index,
      });
      if (res.data) {
        state.loading = false;
        state.playList = res.data.playlists;
        state.page.total = res.data.total;
      }
    };

    // 得到精品歌单类型列表
    const getHeightQualityType = async () => {
      let res = await GET_SONG_LIST_TYPE_HIGHT_QUALITY();
      state.qualityTypeList = res.data.tags;
    };

    // 得到精品歌单列表
    const getHeightQualityList = async (tag: string) => {
      let res = await GET_SONG_LIST_HEIGHT_QUALITY({
        cat: tag,
      });
      state.qualityList = res.data.playlists;
    };
    // 分页
    const paginateHandle = val => {
      state.page.index = val;
      getListByType(state.curType);
    };

    // 去精品歌单界面
    const toHeightQuality = () => {
      router.push({
        name: 'HeightQuality',
        query: {
          type: state.curType,
        },
      });
    };
    getListByType('');
    getHeightQualityType();
    return {
      typeSelect,
      ...toRefs(state),
      judgePayCount,
      paginateHandle,
      toHeightQuality,
    };
  },
});
</script>
<style lang="scss" scoped>
.top-card {
  height: 20vh;
  padding: 20px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  &::after {
    content: '';
    width: 120%;
    height: 120%;
    position: absolute;
    left: -10px;
    top: -10px;
    filter: blur(10px);
    background: inherit;
    background-position: center;
    z-index: 2;
  }
  @include jcc-aic-row;
  .cover {
    width: 200px;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    z-index: 3;
    box-sizing: border-box;
  }
  .info {
    box-sizing: border-box;
    margin-top: 40px;
    margin-left: 20px;
    width: 80%;
    height: 100%;
    z-index: 3;
    .inbutton {
      background: transparent;
      border: 1px solid rgb(231, 170, 90);
      border-radius: 20px;
      padding: 2px 10px;
      width: 120px;
      @include jcc-aic-row;
      color: rgb(231, 170, 90);
      font-size: 18px;
      cursor: pointer;
      i {
        font-size: 30px;
      }
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      margin-top: 30px;
      width: 100%;
    }
    .des {
      margin-top: 30px;
      font-size: 14px;
      color: #ccc;
    }
  }
}

.operate-wrap {
  width: 100%;
  height: 80px;
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select-button {
    padding: 5px 25px;
    border: 1px solid #ccc;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    font-size: 18px;
    @include jcc-aic;
    cursor: pointer;
  }
  .select-item {
    width: 40vw;
    @include jcc-aic-row;
    column-gap: 10px;
    .item {
      padding: 3px 15px;
      font-size: 14px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .is-active {
      border-radius: 18px;
      border: none;
      color: red;
      background-color: rgb(254, 246, 245);
    }
  }
}

.song-list {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 20px;
  overflow: hidden;
  .list-item {
    height: auto;
    width: 300px;
    cursor: pointer;
    .item-cover {
      width: 300px;
      height: 300px;
      margin-bottom: 10px;
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      .play-num {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #fff;
      }
      .auth {
        position: absolute;
        width: 200px;
        left: 10px;
        bottom: 10px;
        font-size: 16px;
        @include jcc-aic-row;
        color: #fff;
        cursor: pointer;
        span {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          width: 200px;
          text-overflow: ellipsis;
        }
      }
    }
    .list-des {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.7);
      line-height: 25px;
      width: 250px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.pagination {
  width: 100%;
  height: 100px;
  @include jcc-aic;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
