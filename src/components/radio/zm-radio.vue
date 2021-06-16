<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-15 10:37:06
-->
<template>
  <!-- 关键点是这个label标签，它可以自动响应点击事件，自动将焦点转到它里面的表单元素上 -->
  <label class="zm-radio">
    <span
      class="zm-radio__input"
      :class="{
        'is-checked': model === label,
      }"
    >
      <span class="zm-radio__inner"></span>
      <input
        class="zm-radio__origin"
        ref="radioRef"
        v-model="model"
        :value="label"
        type="radio"
        @change="handleChange"
      />
    </span>
    <span class="zm-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref, inject } from 'vue';

export const UPDATE_MODEL_EVENT = 'update:modelValue';

export default defineComponent({
  name: 'ZmRadio',

  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
    },
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const radioRef = ref<HTMLInputElement>();
    const radioGroup = inject('ZmRadioGroup') as any;

    // 选择方法
    const handleChange = () => {
      ctx.emit('change', model.value);
    };

    const model = computed<string | number | boolean>({
      get() {
        return radioGroup.name === 'ZmRadioGroup' ? radioGroup.modelValue : props.modelValue;
      },
      set(val) {
        if (radioGroup.name === 'ZmRadioGroup') {
          radioGroup.changeEvent(val);
        } else {
          ctx.emit(UPDATE_MODEL_EVENT, val);
        }

        radioRef.value.checked = props.modelValue === props.label;
      },
    });

    return {
      handleChange,
      model,
      radioRef,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(radio) {
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  @include e(input) {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    @include when(checked) {
      .#{$namespace}-radio__inner {
        border: 1px solid rgb(253, 84, 78);
        &::after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
      & + .#{$namespace}-radio__label {
        color: rgb(253, 84, 78);
      }
    }
  }
  @include e(inner) {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 18px;
    height: 18px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    &::after {
      width: 70%;
      height: 70%;
      border-radius: 100%;
      background-color: rgb(253, 84, 78);
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
    }
  }
  @include e(origin) {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }
  @include e(label) {
    // vertical-align: middle;
    margin-left: 10px;
    // color: red;
  }
}
</style>
