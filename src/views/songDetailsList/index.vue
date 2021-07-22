<!--
 * @Description: 歌单详情页
 * @Autor: ZmSama
 * @Date: 2021-07-16 16:15:13
-->
<template>
  <div class="song-details-wrap">
    <div class="top-msg">
      <div class="cover">
        <img :src="detailsInfo?.coverImgUrl" alt="" />
      </div>
      <div class="right-msg">
        <div class="title">
          <el-tag type="danger">歌单</el-tag>
          <span class="title-name">
            {{ detailsInfo?.name }}
          </span>
        </div>
        <div class="creator">
          <el-avatar
            size="small"
            icon="el-icon-user-solid"
            :src="detailsInfo?.creator.avatarUrl"
          ></el-avatar>
          <span class="creator-name">{{ detailsInfo?.creator.nickname }}</span>
          <span class="creator-time">{{ formatDate(detailsInfo?.createTime) }}创建</span>
        </div>
        <div class="operation">
          <div class="playall">
            <i class="iconfont icon-bofang2"></i>
            <span>播放全部</span>
          </div>
          <div class="collect">
            <i class="iconfont icon-quxiaoshoucang"></i>
            <span>收藏({{ judgePayCount(detailsInfo?.subscribedCount) }})</span>
          </div>
          <div class="share">
            <i class="iconfont icon-fenxiang"></i>
            <span>分享({{ judgePayCount(detailsInfo?.shareCount) }})</span>
          </div>
          <div class="download">
            <i class="iconfont icon-xiazai"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="des">
          <div class="tags">
            标签:
            <span>{{ detailsInfo?.tags.join('/') }}</span>
          </div>
          <div class="history">
            歌曲：
            <span>{{ detailsInfo?.trackIds.length }}</span>
            播放:
            <span>{{ judgePayCount(detailsInfo?.playCount) }}</span>
          </div>
          <div class="des-details">
            <div class="details" ref="detailsRef">
              简介:
              <p v-for="(item, index) in des" :key="index">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" :style="moreSty" @click="showMoreHandler">
        <i class="iconfont icon-bofang2"></i>
      </div>
    </div>

    <div class="middle-list">
      <!-- <div class="search-song">
        <el-input placeholder="请输入内容" size="mini" suffix-icon="el-icon-search"></el-input>
      </div> -->
      <el-tabs v-model="activePane" class="pane-customer-class">
        <el-tab-pane label="歌曲列表" name="songList">
          <el-table
            stripe
            size="mini"
            :data="songList"
            v-loading="loading"
            style="width: 100%"
            empty-text="暂无数据"
          >
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="pic" width="80">
              <div class="operate">
                <i class="iconfont icon-heart" @click="showTotal"></i>
                <i class="iconfont icon-xiazai1"></i>
              </div>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="音乐标题"></el-table-column>
            <el-table-column prop="ar" label="歌手" show-overflow-tooltip width="200">
              <template #default="scope">
                <span>{{ scope.row.ar.map(item => item.name).join('/') }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="al" label="专辑" show-overflow-tooltip>
              <template #default="scope">
                <span>{{ scope.row?.al.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dt" width="100" label="时长">
              <template #default="scope">
                <span>{{ dtJudge(scope.row.dt) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`评论(${total})`" name="comment">
          <comments-list @get-total="getTotal" />
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="subscriber">
          <subscriber-list />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { GET_SONG_LIST_DETAILS, GET_SONG_LIST_BY_ID_CHAIN } from '@/api/modules/music';
import { useRoute } from 'vue-router';
import GloabTools from '@/utils/tools';
import SubscriberList from './components/subscriberList.vue';
import CommentsList from './components/commentsList.vue';
export default defineComponent({
  name: 'SongDetailsList',
  components: {
    SubscriberList,
    CommentsList,
  },
  setup() {
    const state = reactive({
      isMore: false,
      detailsRef: null as HTMLElement,
      detailsInfo: null, //歌单所有信息
      songList: [], //歌单下的歌曲
      des: [],
      activePane: 'songList',
      loading: false,
      total: 0,
    });

    const route = useRoute();
    const { judgePayCount, formatDate, dtJudge } = GloabTools();

    // 三角按钮样式
    const moreSty = computed(() => {
      if (state.isMore) {
        return {
          transform: 'rotate(270deg)',
        };
      } else {
        return {
          transform: 'rotate(90deg)',
        };
      }
    });

    // 查看更多
    const showMoreHandler = () => {
      if (state.isMore) {
        state.isMore = false;
        state.detailsRef.style.height = '20px';
      } else {
        state.isMore = true;
        state.detailsRef.style.height = state.detailsRef.scrollHeight + 'px';
      }
    };

    // 得到歌单详情
    const getSongListDetails = async (id: string) => {
      let res = await GET_SONG_LIST_DETAILS({
        id,
      });
      if (res.data.playlist) {
        // 将歌单基本信息赋值
        state.detailsInfo = res.data.playlist;
        // 处理一下描述信息
        state.des = res.data.playlist.description.split('\n');
        getSongListByidChain(res.data.playlist?.trackIds.map(item => item.id).join(','));
      }
    };

    // 得到音乐列表，根据id串
    const getSongListByidChain = async (ids: string) => {
      state.loading = true;
      let res = await GET_SONG_LIST_BY_ID_CHAIN({ ids });
      if (res.data) {
        state.loading = false;
        state.songList = res.data.songs;
      }
    };

    // 得到总页数
    const getTotal = val => {
      state.total = val;
    };

    const showTotal = () => {};

    watchEffect(() => {
      let id = route.query.id as string;
      if (id) {
        getSongListDetails(id);
      }
    });

    return {
      showMoreHandler,
      ...toRefs(state),
      moreSty,
      judgePayCount,
      formatDate,
      dtJudge,
      showTotal,
      getTotal,
    };
  },
});
</script>
<style lang="scss" scoped>
.song-details-wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  @include scroll-bar;
  .top-msg {
    width: 100%;
    height: auto;
    padding: 20px 10px;
    @include jcc-aic-row;
    position: relative;
    .cover {
      width: 220px;
      height: 220px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 8px;
      overflow: hidden;
    }
    .right-msg {
      height: auto;
      margin-left: 220px;
      width: 80%;
      .title {
        font-size: 28px;
        font-weight: 600;
        @include jcc-aic-row;
        .title-name {
          padding-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .creator {
        @include jcc-aic-row;
        margin-top: 10px;
        .creator-name {
          font-size: 14px;
          color: skyblue;
          padding-left: 10px;
        }
        .creator-time {
          padding-left: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .operation {
        @include jcc-aic-row;
        margin-top: 10px;
        .playall {
          padding: 5px 22px;
          background: rgb(253, 84, 78);
          color: #fff;
          border: none;
          font-size: 16px;
          @include jcc-aic-row;
          border-radius: 24px;
          cursor: pointer;
          &:hover {
            background-color: rgb(196, 13, 13);
          }
        }
        .collect {
          padding: 5px 22px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          font-size: 16px;
          @include jcc-aic-row;
          border-radius: 24px;
          cursor: pointer;
          margin-left: 10px;
          &:hover {
            background-color: rgb(242, 242, 242);
          }
        }
        .share {
          @extend .collect;
        }
        .download {
          @extend .collect;
        }
      }
      .des {
        width: 100%;
        height: auto;
        margin-top: 10px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        .details {
          height: 20px;
          display: -webkit-box;
          overflow: hidden;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          transition: 0.6s all;
        }
      }
    }
    .show-more {
      position: absolute;
      right: 30px;
      bottom: 0px;
      transform: rotate(90deg);
      cursor: pointer;
      transition: 0.6s all;
      i {
        font-size: 30px;
      }
    }
  }
  .middle-list {
    position: relative;
    width: 100%;
    height: auto;
    .search-song {
      position: absolute;
      right: 10%;
      top: 0;
      z-index: 2021;
    }
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.operate {
  width: 70%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.pane-customer-class {
  padding-bottom: 20px;
}
</style>
