<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-25 11:22:13
-->
<template>
  <ul class="zm-pagination" @click="clickHandler">
    <a
      href="#"
      class="prev-btn"
      :class="{ 'is-disable': internalCurrentPage === 1 }"
      @click.stop="prePageHandler"
    ></a>
    <li :class="{ 'is-active': internalCurrentPage === 1 }">1</li>
    <li class="pagination__prev" v-show="showPreBtn"></li>
    <li v-for="i in pager" :key="i" :class="{ 'is-active': internalCurrentPage === i }">{{ i }}</li>
    <li class="pagination__next" v-show="showNextBtn"></li>
    <li :class="{ 'is-active': internalCurrentPage === internalPageCount }">
      {{ internalPageCount }}
    </li>
    <a
      href="#"
      class="next-btn"
      :class="{ 'is-disable': internalCurrentPage === internalPageCount }"
      @click.stop="nextPageHandler"
    ></a>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';

export default defineComponent({
  name: 'ZmPagination',
  props: {
    total: {
      type: Number,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  emits: ['change', 'currentChange'],
  setup(props, { emit }) {
    // 外面的值
    const { total, pagerCount, currentPage, pageSize } = props;
    const showPreBtn = ref(false);
    const showNextBtn = ref(false);
    // 内部页数
    const internalPageSize = ref(pageSize);
    // 内部当前页
    const internalCurrentPage = ref(currentPage);
    // 计算总页数
    const internalPageCount = computed(() => Math.max(1, Math.ceil(total / pageSize)));
    // 偏移值
    const pagerCountOffset = pagerCount - 2;

    const pager = computed(() => {
      // 用来判断是显示左折叠还是右折叠的变量
      const halfPagerCount = (pagerCount - 1) / 2;
      // 控制显示左边还是右边
      let showLeft = false;
      let showRight = false;

      if (internalPageCount.value > pagerCount) {
        // 当前页大于某个差值就显示左边的折叠按钮，这个差值是4，但由于是大于号，所以其实是5
        if (internalCurrentPage.value > pagerCount - halfPagerCount) {
          showLeft = true;
        }
        if (internalCurrentPage.value < internalPageCount.value - halfPagerCount) {
          showRight = true;
        }
      }
      const array = [];
      // 仅当左边出现折叠按钮时
      if (showLeft && !showRight) {
        // 动态计算要生成多少个按钮，这里就决定每次都是跳5页的原理
        const startPage = internalPageCount.value - (pagerCount - 2);
        for (let i = startPage; i < internalPageCount.value; i++) {
          array.push(i);
        }
        // 仅右边折叠出现时，说明当前页必定小于5，因为1号是固定的，所以起始位置是2
        // 结束位置就是7，因为7不小于7，所以结果是2-6
      } else if (!showLeft && showRight) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
        // 如果两个折叠按钮都出现
      } else if (showLeft && showRight) {
        // 计算前后一样的一个偏移值，展示数除以2向下取整再-1，默认值是2
        const offset = Math.floor(pagerCount / 2) - 1;
        for (
          let i = internalCurrentPage.value - offset;
          i <= internalCurrentPage.value + offset;
          i++
        ) {
          array.push(i);
        }
        // 都不显示的话说明总页数没有超过显示数，直接循环，1号是固定的，且最后的值也是固定的，所以不用=号
      } else {
        for (let i = 2; i < internalPageCount.value; i++) {
          array.push(i);
        }
      }

      return array;
    });

    // 在跟元素绑定点击事件，通过冒泡判断点击的是哪一个按钮
    const clickHandler = (e: MouseEvent) => {
      const tagName = e.target['tagName'] as string;
      const className = e.target['className'] as string;
      const index = e.target['textContent'];
      if (tagName.toLowerCase() === 'ul') {
        return;
      } else if (tagName.toLowerCase() === 'li') {
        // 如果是这个类代表快速下5页
        if (className === 'pagination__next') {
          internalCurrentPage.value += pagerCountOffset;
        } else if (className === 'pagination__prev') {
          internalCurrentPage.value -= pagerCountOffset;
        } else {
          if (index < 1) {
            internalCurrentPage.value = 1;
          } else if (index > internalPageCount) {
            internalCurrentPage.value = internalCurrentPage.value;
          } else {
            internalCurrentPage.value = Number(index);
          }
        }
        emit('currentChange', internalCurrentPage.value);
      }
    };
    // 上一页
    const prePageHandler = () => {
      internalCurrentPage.value--;
      emit('currentChange', internalCurrentPage.value);
    };
    // 下一页
    const nextPageHandler = () => {
      internalCurrentPage.value++;
      emit('currentChange', internalCurrentPage.value);
    };
    // vue3新api，只要有响应式数据更新他就会触发,这里用来动态计算左右折叠按钮是否显示
    watchEffect(() => {
      const halfPagerCount = (pagerCount - 1) / 2;
      showPreBtn.value = false;
      showNextBtn.value = false;
      // 总页数大于可现实按钮时才触发
      if (internalPageCount.value > pagerCount) {
        if (internalCurrentPage.value > pagerCount - halfPagerCount) {
          // 显示左边
          showPreBtn.value = true;
        }
        if (internalCurrentPage.value < internalPageCount.value - halfPagerCount) {
          // 显示右边
          showNextBtn.value = true;
        }
      }
    });
    return {
      showPreBtn,
      showNextBtn,
      pager,
      internalPageCount,
      internalCurrentPage,
      clickHandler,
      prePageHandler,
      nextPageHandler,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(pagination) {
  @include jcc-aic-row;
  column-gap: 10px;
  li {
    list-style: none;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 4px;
    height: 28px;
    width: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      background-color: rgb(253, 84, 78);
      color: #fff;
    }
  }
  .is-active {
    background-color: rgb(253, 84, 78);
    color: #fff;
  }
  .is-disable {
    pointer-events: none;
    cursor: not-allowed;
  }
  .prev-btn {
    height: 28px;
    width: 28px;
    border: 1px solid #ccc;
    padding: 5px;
    @include jcc-aic;
    border-radius: 4px;
    &::before {
      content: '';
      height: 8px;
      width: 8px;
      border: 2px solid #ccc;
      border-top: none;
      border-right: none;
      transform: rotate(45deg);
      text-align: center;
      margin-left: 5px;
    }
  }
  .next-btn {
    height: 28px;
    width: 28px;
    border: 1px solid #ccc;
    padding: 5px;
    @include jcc-aic;
    border-radius: 4px;
    &::after {
      content: '';
      height: 8px;
      width: 8px;
      border: 2px solid #ccc;
      border-top: none;
      border-right: none;
      transform: rotate(225deg);
      text-align: center;
      margin-right: 5px;
    }
  }
  .pagination__prev {
    &::after {
      content: '\2022\2022\2022';
    }
    &:hover::after {
      content: '\00AB';
      font-size: 24px;
    }
  }
  .pagination__next {
    &::after {
      content: '\2022\2022\2022';
    }
    &:hover::after {
      content: '\00BB';
      font-size: 24px;
    }
  }
}
</style>
