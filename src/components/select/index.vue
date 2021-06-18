<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-16 14:56:16
-->
<template>
  <div class="zm-select" ref="ZmSelect" v-clickoutside="handleCloseDrective">
    <input
      type="text"
      :value="curVal"
      placeholder="请输入"
      @click="inputClick"
      class="zm-select__inner"
    />
    <div class="zm-select__arrow" ref="arrow"></div>
    <transition name="zm-popper">
      <div
        v-if="data.length > 0"
        @click.stop="clickPopper"
        :style="popperWidth"
        class="zm-select__popper"
        v-show="visible"
        ref="popper"
      >
        <div
          class="popper-item"
          @click="selectValue($event, item)"
          v-for="item in data"
          :key="item.value"
        >
          {{ item.label }}
        </div>
      </div>
      <div v-else :style="popperWidth" class="zm-select__popper" v-show="visible" ref="popper">
        <div class="plan">当前没有数据</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import { createPopper } from '@popperjs/core';
import clickoutside from '@/directives/clickoutside';
import { slectOptType } from './types';
// 导出自定义事件，这是vue规定的
export const UPDATE_MODEL_EVENT = 'update:modelValue';
export default defineComponent({
  name: 'ZmSelect',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  directives: {
    clickoutside,
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const ZmSelect = ref<HTMLElement>();
    const popper = ref<HTMLElement>();
    const arrow = ref<HTMLElement>();
    const curVal = ref('');

    const { modelValue, data } = props;

    const popperWidth = computed(() => {
      if (ZmSelect.value) {
        return {
          width: `${ZmSelect.value.offsetWidth - 20}px`,
        };
      } else {
        return {
          width: 400 + 'px',
        };
      }
    });

    const inputClick = (e: InputEvent) => {
      visible.value = !visible.value;
      createPopper(ZmSelect.value, popper.value, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
      arrow.value.style.transform = 'rotate(225deg)';
    };
    const inputBlur = (e: InputEvent) => {
      nextTick(() => {
        visible.value = false;
        arrow.value.style.transform = 'rotate(45deg)';
      });
    };
    // 点击popper之外
    const handleCloseDrective = () => {
      console.log('触发这个事件了');
      visible.value = false;
      arrow.value.style.transform = 'rotate(45deg)';
    };

    const clickPopper = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const selectValue = (e, val: slectOptType) => {
      curVal.value = val.label;
      emit(UPDATE_MODEL_EVENT, val.value);
      visible.value = false;
      arrow.value.style.transform = 'rotate(45deg)';
    };

    // 将用户的v-model值和data匹配回写
    const writBack = () => {
      if (modelValue) {
        const val = data.filter(
          (item: slectOptType) => item.value === modelValue
        ) as slectOptType[];
        curVal.value = val[0].label;
      }
    };

    onMounted(() => {
      writBack();
    });

    return {
      visible,
      ZmSelect,
      popper,
      handleCloseDrective,
      popperWidth,
      inputBlur,
      inputClick,
      arrow,
      curVal,
      selectValue,
      clickPopper,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(select) {
  width: 100%;
  height: 50px;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  resize: vertical;
  line-height: 1.5;
  box-sizing: border-box;
  transition: 0.3s all;
  padding: 5px 15px;
  position: relative;
  @include e(inner) {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    resize: vertical;
    width: inherit;
    line-height: 1.5;
    box-sizing: border-box;
    transition: 0.2s all;
    padding: 5px 15px;
    border-radius: 6px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-color: rgb(245, 137, 137);
    }
    &::placeholder {
      color: #ccc;
    }
    &:disabled {
      cursor: not-allowed;
      background-color: #f5f1f1;
    }
  }
  @include e(arrow) {
    position: absolute;
    right: 25px;
    top: 50%;
    height: 7px;
    width: 7px;
    margin-top: -3.5px;
    border: 2px solid #ccc;
    transform: rotate(45deg);
    border-right: none;
    border-bottom: none;
    transition: 0.4s all;
  }
  @include e(popper) {
    width: inherit;
    background-color: #fff;
    z-index: 4021;
    // @include jcc-aic;
    // flex-direction: column;
    // transition: 0.4s all;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 5px 0;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      padding: 3px 0;
    }
    .popper-item {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      transition: 0.2s backgroud-color;
      cursor: pointer;
      &:hover {
        background-color: rgb(235, 231, 231);
      }
    }
    .plan {
      padding: 20px;
      font-size: 16px;
      color: #ccc;
      text-align: center;
    }
  }
}

.zm-popper-enter-to {
  opacity: 0;
  // animation: fade-in 0.4s linear forwards;
  // opacity: 0;
  // height: 0;
  // transform: translate(5%, 5%);
}

.zm-popper-leave-to {
  animation: fade-out 0.4s linear forwards;
  // opacity: 1;
  // height: 300px;
  // transform: translate(-5%, -5%);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
