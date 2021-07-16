<!--
 * @Description: 歌单详情页
 * @Autor: ZmSama
 * @Date: 2021-07-16 16:15:13
-->
<template>
  <div class="song-details-wrap">
    <div class="top-msg">
      <div class="cover">
        <img src="@/assets/img/avater.jpg" alt="" />
      </div>
      <div class="right-msg">
        <div class="title">
          <el-tag type="danger">歌单</el-tag>
          <span class="title-name">
            今天从《二十四桥》听起|私人雷达jdofjsdofnsdofjofjsodijidjidjidjidjifdjfidjfosdjfoisdjfoisdjfisdofi
            fjdoifjodsjfisdjfido哦等方式的佛山的
          </span>
        </div>
        <div class="creator">
          <el-avatar
            size="small"
            icon="el-icon-user-solid"
            src="@/assets/img/avater.jpg"
          ></el-avatar>
          <span class="creator-name">云音乐私人雷达</span>
          <span class="creator-time">2019-12-16创建</span>
        </div>
        <div class="operation">
          <div class="playall">
            <i class="iconfont icon-bofang2"></i>
            <span>播放全部</span>
          </div>
          <div class="collect">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏(2802万)</span>
          </div>
          <div class="share">
            <i class="iconfont icon-fenxiang"></i>
            <span>分享(43万)</span>
          </div>
          <div class="download">
            <i class="iconfont icon-xiazai"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="des">
          <div class="tags">
            标签:
            <span>流行</span>
          </div>
          <div class="history">
            歌曲：
            <span>35</span>
            播放:
            <span>731977万</span>
          </div>
          <div class="des-details">
            简介:
            <div class="details" ref="detailsRef">
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
              <div>值得反复聆听 私人雷达</div>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" :style="moreSty" @click="showMoreHandler">
        <i class="iconfont icon-bofang2"></i>
      </div>
    </div>

    <div class="middle-list">
      <div class="search-song">
        <el-input placeholder="请输入内容" size="mini" suffix-icon="el-icon-search"></el-input>
      </div>
      <el-tabs>
        <el-tab-pane label="歌曲列表" name="first">
          <el-table stripe size="mini" style="width: 100%" max-height="610" empty-text="暂无数据">
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="pic" width="80"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="songName"
              label="音乐标题"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="art"
              label="歌手"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column prop="al" label="专辑" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dt" label="时长"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'SongDetailsList',
  setup() {
    const state = reactive({
      isMore: false,
      detailsRef: null as HTMLElement,
    });

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
    const showMoreHandler = () => {
      if (state.isMore) {
        state.isMore = false;
        state.detailsRef.style.height = '20px';
      } else {
        state.isMore = true;
        state.detailsRef.style.height = state.detailsRef.scrollHeight + 'px';
      }
    };

    return {
      showMoreHandler,
      ...toRefs(state),
      moreSty,
    };
  },
});
</script>
<style lang="scss" scoped>
.song-details-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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
        background-color: aqua;
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
</style>
