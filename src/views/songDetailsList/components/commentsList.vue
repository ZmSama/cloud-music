<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-20 11:00:43
-->
<template>
  <div class="comments-list-wrap">
    <div class="top-operate">
      <el-input
        class="inputClss"
        type="textarea"
        placeholder="请输入内容"
        maxlength="140"
        show-word-limit
      ></el-input>
      <div class="operate-bottom">
        <i class="iconfont icon-aite1"></i>
        <i class="iconfont icon-jinghao"></i>
        <div class="submit-comment">评论</div>
      </div>
    </div>
    <comment-list-component
      :loading="loading"
      :commentsList="commentsList"
      :topCommentsList="topCommentsList"
      :total="total"
    />

    <customer-el-pagination :size="size" :index="index" :total="total" @change="paginationChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { GET_SONG_LIST_COMMENTS_BY_ID } from '@/api/modules/music';
import { useRoute } from 'vue-router';
import GloabTools from '@/utils/tools';
import CommentListComponent from '@/components/commentList/index.vue';
export default defineComponent({
  name: 'CommentsList',
  components: {
    CommentListComponent,
  },
  emits: ['get-total'],
  setup(props, { emit }) {
    const route = useRoute();
    const state = reactive({
      index: 1,
      size: 20,
      total: 0,
      topCommentsList: [],
      commentsList: [],
      loading: false,
    });
    const { commentDateFormat } = GloabTools();

    // 得到歌单的评论
    const getCommentsList = async (id: any) => {
      state.loading = true;
      let res = await GET_SONG_LIST_COMMENTS_BY_ID({ id });
      if (res.data) {
        state.loading = false;
        const { topComments, total, comments } = res.data;
        state.topCommentsList = topComments;
        state.total = total;
        state.commentsList = comments;
        emit('get-total', total);
      }
    };

    // 分页
    const paginationChange = val => {
      state.index = val;
      getCommentsList(route.query.id);
    };

    watchEffect(() => {
      let id = route.query.id;
      if (id) {
        getCommentsList(id);
      }
    });

    return {
      ...toRefs(state),
      commentDateFormat,
      paginationChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.comments-list-wrap {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .top-operate {
    width: 100%;
    .operate-bottom {
      margin-top: 10px;
      @include jcc-aic-row;
      width: inherit;
      position: relative;
      i {
        margin-left: 10px;
        cursor: pointer;
      }
      .submit-comment {
        position: absolute;
        right: 20px;
        padding: 5px 20px;
        border: 1px solid #ccc;
        border-radius: 24px;
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
  .hot-comments {
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
}
</style>
