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
    <input type="text" v-model="inputContent" @focus="inputFocusHandler" @click.stop="" />
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
              v-for="(item, i) in HistoryBaseData"
              :key="item.id"
              @click="selectHistoryHandler(item)"
            >
              <span>{{ item.text }}</span>
              <div class="hover-icon" @click.stop="deleteHistoryItem(item.id, i)">
                <span class="close">+</span>
              </div>
            </div>
          </transition-group>
        </div>
        <!-- 热搜榜 -->
        <div class="zm-card__bottom">
          <div class="hot-item" v-for="(item, index) in listData" :key="item.id">
            <div class="hot-item-left">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="hot-item-right">
              <div class="name-heat">
                <span class="name">{{ item.name }}</span>
                <svg-icon
                  :name="item.type"
                  size="22"
                  :color="iconColor(item.type)"
                  v-if="item.type"
                />
                <span class="num">{{ item.hotNum }}</span>
              </div>
              <div class="description">
                <span>{{ item.des }}</span>
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
export default defineComponent({
  name: 'InputSelect',
  props: {
    historydata: {
      type: Array,
      default: () => [],
    },
    hotdata: {
      type: Array,
      default: () => [],
    },
  },
  directives: {
    clickoutside,
  },
  setup(props) {
    const { hotdata } = props;
    const listData = ref([]);
    listData.value = hotdata;
    // 输入框相关逻辑
    const {
      isFocus,
      inputContent,
      inputFocusHandler,
      cleanContent,
      handleCloseDrective,
      HistoryBaseData,
      lookMoreHandler,
      deleteHistoryItem,
      index,
      cleanHistory,
      isLookMore,
    } = useInput(props.historydata);

    const selectHistoryHandler = (item: any) => {
      console.log(item);

      // ctx.emit("selectHistoryItem", item)
    };

    const iconColor = (type: string) => {
      switch (type) {
        case 'up':
          return 'red';
        case 'new':
          return 'green';
        case 'hot':
          return 'red';
      }
    };
    return {
      isFocus,
      inputContent,
      inputFocusHandler,
      handleCloseDrective,
      HistoryBaseData,
      lookMoreHandler,
      deleteHistoryItem,
      index,
      cleanHistory,
      cleanContent,
      isLookMore,
      selectHistoryHandler,
      iconColor,
      listData,
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
              .num {
                color: #ccc;
                padding-left: 5px;
              }
            }
            .description {
              color: #ccc;
              font-size: 10px;
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
