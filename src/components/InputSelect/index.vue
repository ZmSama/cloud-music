<!--
 * @Description: 有搜索历史和下拉选择的输入框
 * @Autor: ZmSama
 * @Date: 2021-05-14 16:06:33
-->
<template>
  <div class="zm-input">
    <div class="zm-input__prefix">
      <svg-icon name="search" color="#fff" size="15"></svg-icon>
    </div>
    <div class="zm-input__placeholder" v-show="!isFocus && !inputContent">
      <span>搜索</span>
    </div>
    <input
      type="text"
      v-model="inputContent"
      @keydown="inputKeyDown"
      @focus="inputFocusHandler"
      @click.stop="inputClick"
    />
    <div class="zm-input__suffix" v-show="inputContent" @click.stop="cleanContent">
      <svg-icon name="lajitong" color="#fff" size="15"></svg-icon>
    </div>

    <div class="zm-input__overflow">
      <div class="zm-card" v-clickoutside="handleCloseDrective" v-show="isFocus">
        <div class="zm-card__header">
          <div class="text">
            <span>搜索历史</span>
            <div class="clean-history">
              <svg-icon name="lajitong" size="15" @click="cleanHistory" />
            </div>
          </div>
          <div class="look-more" @click="lookMoreHandler" v-show="!isLookMore">
            <span>查看全部</span>
          </div>
        </div>
        <!-- 历史数据选项 -->
        <div class="zm-card__main">
          <transition-group name="slide-fade">
            <div
              class="option-item"
              v-for="(item, i) in HistoryData"
              :key="item"
              @click="selectHistoryHandler(item)"
            >
              <span>{{ item }}</span>
              <div class="hover-icon" @click.stop="deleteHistoryItem(item, i)">
                <span class="close">+</span>
              </div>
            </div>
          </transition-group>
        </div>
        <!-- 热搜榜 -->
        <div class="zm-card__bottom">
          <div
            class="hot-item"
            v-for="(item, index) in hotdata"
            :key="item.searchWord"
            @click="selectTheHot(item.searchWord)"
          >
            <div class="hot-item-left">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="hot-item-right">
              <div class="name-heat">
                <span class="name">{{ item.searchWord }}</span>
                <div class="icon" v-if="item.iconUrl">
                  <img :src="item.iconUrl" alt="" />
                </div>
                <span class="num">{{ item.score }}</span>
              </div>
              <div class="description">
                <span :title="item.content">{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import clickoutside from '@/directives/clickoutside';
import useInput from './hook/useInput';
import { getItem, setItem } from '@/utils/localStorage';
import { HISTORY_KEY } from '@/utils/local-key';
export default defineComponent({
  name: 'InputSelect',
  props: {
    hotdata: {
      type: Array,
      default: () => [],
    },
  },
  directives: {
    clickoutside,
  },
  emits: ['keydown', 'selectHistoryItem'],
  setup(props, { emit }) {
    // 输入框相关逻辑
    const {
      isFocus,
      inputContent,
      inputFocusHandler,
      cleanContent,
      handleCloseDrective,
      HistoryData,
      lookMoreHandler,
      deleteHistoryItem,
      index,
      cleanHistory,
      isLookMore,
      updateLayout,
      inputClick,
    } = useInput();

    const selectHistoryHandler = (item: any) => {
      emit('selectHistoryItem', item);
      isFocus.value = false;
    };

    const iconColor = (type: string) => {
      switch (type) {
        case 'alg_search_rec_hotquery_base_hotquery':
          return 'red';
        case 'featured':
          return 'green';
      }
    };

    const iconType = (type: string) => {
      switch (type) {
        case 'alg_search_rec_hotquery_base_hotquery':
          return 'hot';
        case 'featured':
          return 'new';
      }
    };

    // 选择热搜
    const selectTheHot = (key: string) => {
      isFocus.value = false;
      getItem(HISTORY_KEY).then((res: any[]) => {
        let prevContent = res;
        if (prevContent) {
          // 寻找是否有相同的
          let isCom = prevContent.some(item => item === key);
          if (!isCom) {
            let arr = [...prevContent, key];
            // 用户确认了。那就存储入本地，以数组的形式存进去
            setItem(HISTORY_KEY, arr);
            updateLayout(6);
          }
        } else {
          setItem(HISTORY_KEY, [key]);
          updateLayout(6);
        }
        emit('keydown', key);
      });
    };

    const inputKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        isFocus.value = false;
        getItem(HISTORY_KEY).then((res: any[]) => {
          let prevContent = res;
          if (prevContent) {
            // 寻找是否有相同的
            let isCom = prevContent.some(item => item === inputContent.value);
            if (!isCom) {
              let arr = [...prevContent, inputContent.value];
              // 用户确认了。那就存储入本地，以数组的形式存进去
              setItem(HISTORY_KEY, arr);
              updateLayout(6);
            }
          } else {
            setItem(HISTORY_KEY, [inputContent.value]);
            updateLayout(6);
          }
          emit('keydown', inputContent.value);
        });
      }
    };

    return {
      isFocus,
      inputContent,
      inputFocusHandler,
      handleCloseDrective,
      HistoryData,
      lookMoreHandler,
      deleteHistoryItem,
      index,
      cleanHistory,
      cleanContent,
      isLookMore,
      selectHistoryHandler,
      iconColor,
      inputKeyDown,
      inputClick,
      iconType,
      selectTheHot,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(input) {
  margin-left: 40px;
  padding-left: 10px;
  border-radius: 24px;
  width: 200px;
  height: 32px;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.2);
  @include jcc-aic-row;
  position: relative;

  @include e(prefix) {
    @include jcc-aic;
  }
  @include e(placeholder) {
    position: absolute;
    z-index: -1;
    left: 32px;
    font-size: 16px;
  }
  @include e(suffix) {
    position: absolute;
    right: 10px;
    cursor: pointer;
    z-index: 2;
    @include jcc-aic;
  }

  @include e(overflow) {
    overflow: hidden;
    border-radius: 10px;
    position: absolute;
    top: 36px;
    left: -30px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    z-index: 2021;

    @include b(card) {
      height: 430px;
      width: 320px;
      padding: 10px 0;
      z-index: 2;
      background-color: #fff;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        padding: 3px 0;
      }

      @include e(header) {
        width: 320px;
        font-size: 10px;
        color: rgba(0, 0, 0, 0.6);
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 10px;
        .text {
          @include jcc-aic-row;
          .clean-history {
            cursor: pointer;
          }
        }
        .look-more {
          cursor: pointer;
          @include jcc;
          &:hover {
            color: rgba(0, 0, 0, 1);
          }
        }
      }

      @include e(main) {
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        .option-item {
          height: 20px;
          width: auto;
          background-color: #fff;
          border-radius: 24px;
          padding: 3px 20px;
          margin-left: 5px;
          margin-top: 4px;
          border: 1px solid #ccc;
          cursor: pointer;
          position: relative;
          @include jcc-aic;
          span {
            font-size: 10px;
            color: rgba(0, 0, 0, 0.7);
          }
          .hover-icon {
            position: absolute;
            right: 5px;
            z-index: 2;
            @include jcc-aic;
            opacity: 0;
            .close {
              transform: rotate(45deg);
              font-size: 18px;
              font-weight: 600;
            }
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
            opacity: 0.8;
            .hover-icon {
              opacity: 1;
            }
          }
        }
      }

      @include e(bottom) {
        font-size: 12px;
        cursor: pointer;
        .hot-item {
          @include jcc-aic-row;
          height: 53px;
          .hot-item-left {
            flex: 1;
            @include jcc-aic;
            font-size: 18px;
            color: red;
          }
          .hot-item-right {
            flex: 5;
            .name-heat {
              @include jcc-aic-row;
              .name {
                font-weight: 600;
                padding-right: 5px;
              }
              .icon {
                width: 30px;
                height: 20px;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
              .num {
                color: #ccc;
                padding-left: 5px;
              }
            }
            .description {
              color: #ccc;
              font-size: 8px;
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}

input {
  outline: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  width: 140px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: scale(0.8);
  opacity: 0.8;
}
.slide-fade-leave-to {
  transform: scale(0.4);
  opacity: 0.4;
}
</style>
