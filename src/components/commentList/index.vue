<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-21 11:00:19
-->
<template>
  <div class="comments-wrap">
    <ul v-loading="loading">
      <template v-if="topCommentsList.length > 0">
        <li class="hot-comment-title"><div>精彩评论</div></li>
        <li v-for="item in topCommentsList" :key="item.commentId">
          <div class="icon">
            <el-avatar :size="40" :src="item.user.avatarUrl"></el-avatar>
          </div>
          <div class="commer-option">
            <div class="commer">
              <span class="user">{{ item.user.nickname }}:</span>
              <span class="comments">{{ item.content }}</span>
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
                  <i class="iconfont icon-zan1"></i>
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
        <li class="hot-comments-btn"><div>更多精彩评论></div></li>
      </template>
      <li class="base-comments">
        <div>最新评论（{{ total }}）</div>
      </li>
      <li v-for="item in commentsList" :key="item.commentId">
        <div class="icon">
          <el-avatar :size="40" :src="item.user.avatarUrl"></el-avatar>
        </div>
        <div class="commer-option">
          <div class="commer">
            <span class="user">{{ item.user.nickname }}:</span>
            <span class="comments">{{ item.content }}</span>
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
                <i class="iconfont icon-zan1"></i>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GloabTools from '@/utils/tools';
export default defineComponent({
  name: 'CommentListComponent',
  props: {
    topCommentsList: {
      type: Array,
      defautl: () => [],
    },
    commentsList: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      defalut: 0,
    },
  },
  setup() {
    const { commentDateFormat } = GloabTools();

    return {
      commentDateFormat,
    };
  },
});
</script>
<style lang="scss" scoped>
.comments-wrap {
  width: 100%;
  padding: 5px 30px;
  ul {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    .hot-comment-title {
      border: none;
      font-size: 16px;
      font-weight: 600;
    }
    .hot-comments-btn {
      border: none;
      @include jcc-aic;
      div {
        cursor: pointer;
        font-size: 18px;
        padding: 10px 15px;
        text-align: center;
        background-color: aqua;
        border-radius: 24px;
      }
    }
    .base-comments {
      border: none;
      font-size: 16px;
      font-weight: 600;
    }
    li {
      list-style: none;
      margin-top: 10px;
      @include jcc-aic-row;
      border-bottom: 1px solid rgba(199, 194, 194, 0.1);
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
              @include jcc-aic-row;
              cursor: pointer;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.3);
            }
            .share {
              @include jcc-aic-row;
              margin-left: 15px;
              cursor: pointer;
            }
            .write {
              @include jcc-aic-row;
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
}
</style>
