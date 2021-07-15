<!--
 * @Description: 精品歌单
 * @Autor: ZmSama
 * @Date: 2021-07-13 16:51:50
-->
<template>
  <div class="quality-header">
    <div class="left">
      <span>精品歌单</span>
    </div>
    <el-popover placement="left" v-model:visible="isShow" :width="600" trigger="click">
      <template #reference>
        <div class="select-button">
          <i class="iconfont icon-icon-filter"></i>
          <span>{{ selectType }}</span>
        </div>
      </template>

      <div class="type-card">
        <div class="all">
          <span>全部歌单</span>
        </div>
        <div class="type-list">
          <div
            class="type-item"
            @click="selectHandeler(item.name)"
            :class="{ 'is-active': selectType === item.name }"
            v-for="item in qualityTypeList"
            :key="item.id"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
  <div class="quality-row" v-loading="loading">
    <div class="row-item" v-for="item in qulityList" :key="item.id">
      <div class="cover">
        <img :src="item.coverImgUrl" alt="" />
        <div class="playnum">
          <i class="iconfont icon-bofang3"></i>
          <span>{{ judgePayCount(item.playCount) }}</span>
        </div>
        <div class="tag">
          <i class="iconfont icon-list-boutique"></i>
        </div>
      </div>
      <div class="info">
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
        <div class="auth">
          <span>by {{ item.creator.nickname }}</span>
          <div class="avvater-cover">
            <img :src="item.creator.avatarDetail?.identityIconUrl" alt="" />
          </div>
        </div>
        <div class="des">{{ item.copywriter }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watchEffect } from 'vue';
import {
  GET_SONG_LIST_TYPE_HIGHT_QUALITY,
  GET_SONG_LIST_HEIGHT_QUALITY,
} from '@/api/modules/music';
import { useRoute } from 'vue-router';
import GloabTools from '@/utils/tools';
export default defineComponent({
  name: 'HeightQuality',
  setup() {
    const route = useRoute();
    const { judgePayCount } = GloabTools();

    const state = reactive({
      isShow: false,
      selectType: '',
      qualityTypeList: [],
      qulityList: [],
      loading: false,
    });
    // 加载精品类型数据
    const getQualityTypeList = async () => {
      let res = await GET_SONG_LIST_TYPE_HIGHT_QUALITY();
      if (res.data) {
        state.qualityTypeList = res.data.tags;
      }
    };

    // 加载精品歌单列表
    const getQualityList = async (type: string) => {
      let res = await GET_SONG_LIST_HEIGHT_QUALITY({
        cat: type,
      });
      state.qulityList = res.data.playlists;
    };

    // 选择精品数据
    const selectHandeler = (val: string) => {
      state.selectType = val;
      state.isShow = false;
    };

    onMounted(() => {
      state.selectType = route.query.type as string;
    });

    watchEffect(() => {
      getQualityTypeList();
      if (state.selectType) {
        getQualityList(state.selectType);
      }
    });

    return {
      ...toRefs(state),
      selectHandeler,
      judgePayCount,
    };
  },
});
</script>
<style lang="scss" scoped>
.quality-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 24px;
    font-weight: 600;
  }
  .select-button {
    padding: 3px 20px;
    border: 1px solid #ccc;
    border-radius: 24px;
    cursor: pointer;
    margin-right: 20px;
  }
}

.quality-row {
  height: auto;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 30px;
  .row-item {
    height: 300px;
    @include jcc-aic-row;
    cursor: pointer;
    margin-left: 5px;
    .cover {
      width: 300px;
      height: 300px;
      border-radius: 14px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 0 8px 2px #ccc;
      &::before {
        content: '';
        width: 100%;
        height: 60px;
        background-color: rgba(182, 177, 177, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        filter: blur(12px);
      }
      .playnum {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #fff;
        text-align: right;
      }
      .tag {
        position: absolute;
        left: 0;
        top: 0;
        color: #f3b068;
        i {
          font-size: 30px;
        }
      }
    }
    .info {
      height: 100%;
      .name {
        margin-top: 30px;
        width: 450px; /*保证文字不会被半汉字截断,显示10个文字*/
        overflow: hidden; /*超出长度的文字隐藏*/
        text-overflow: ellipsis; /*文字隐藏以后添加省略号*/
        white-space: nowrap; /*强制不换行*/
        padding-left: 10px;
        font-size: 18px;
      }
      .auth {
        @extend .name;
        @include jcc-aic-row;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        .avvater-cover {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
        &:hover {
          color: rgba(0, 0, 0, 1);
        }
      }
      .des {
        @extend .name;
        margin-top: 50px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}

.type-card {
  height: auto;
  .all {
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
      color: red;
    }
  }
  .type-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
    margin-top: 10px;
    .type-item {
      padding: 5px 25px;
      cursor: pointer;
      transition: 0.3s all;
      @include jcc-aic;
    }
    .is-active {
      border-radius: 24px;
      background-color: rgb(254, 246, 245);
      color: red;
    }
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
