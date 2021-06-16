<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-16 14:56:16
-->
<template>
  <div @click.stop="toggle" class="zm-select" ref="ZmSelect">
    <input type="text" placeholder="请输入" class="zm-select__inner" />
    <div class="zm-select__arrow"></div>
    <transition name="zm-popper">
      <div
        @click.stop=""
        :style="popperWidth"
        class="zm-select__popper"
        v-clickoutside="handleCloseDrective"
        v-show="visible"
        ref="popper"
      >
        <div class="popper-item">1111</div>
        <div class="popper-item">1111</div>
        <div class="popper-item">1111</div>
        <div class="popper-item">1111</div>
        <div class="popper-item">1111</div>
        <div class="popper-item">1111</div>
        <div class="popper-item">1111</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { createPopper } from '@popperjs/core';
import clickoutside from '@/directives/clickoutside';
export default defineComponent({
  name: 'ZmSelect',
  directives: {
    clickoutside,
  },
  setup() {
    const visible = ref(false);
    const ZmSelect = ref<HTMLElement>();
    const popper = ref<HTMLElement>();

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
    const toggle = () => {
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
    };
    // 点击下来之外
    const handleCloseDrective = () => {
      visible.value = false;
    };

    return {
      toggle,
      visible,
      ZmSelect,
      popper,
      handleCloseDrective,
      popperWidth,
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
    transition: 0.3s all;
    padding: 5px 15px;
    border-radius: 6px;
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
  }
  @include e(popper) {
    width: inherit;
    background-color: #fff;
    z-index: 2021;
    height: auto;
    @include jcc-aic;
    overflow: hidden;
    flex-direction: column;
    transition: 0.4s opacity;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .popper-item {
      width: 100%;
      padding: 10px 5px;
      text-align: center;
      transition: 0.2s all;
      cursor: pointer;
      &:hover {
        background-color: rgb(235, 231, 231);
      }
    }
  }
}

.zm-popper-enter-from,
.zm-popper-leave-to {
  opacity: 0;
}
.zm-popper-enter-to,
.zm-popper-leave-from {
  opacity: 1;
}
</style>
