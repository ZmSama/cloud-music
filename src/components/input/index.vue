<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-10 11:10:53
-->
<template>
  <div class="zm-input" @mouseenter="enterInput" @mouseleave="leaveInput" v-if="!isTextArea">
    <div class="zm-input__prefix" v-if="prefixIcon">
      <svg-icon :name="prefixIcon" size="30px"></svg-icon>
    </div>
    <input
      ref="input"
      :disabled="disabled"
      type="text"
      :placeholder="placeholder"
      v-bind="$attrs"
      class="zm-input__inner"
      :style="inputSty"
      @input="inputHandler"
    />
    <div class="zm-input__clean" v-show="isShowClean" :style="cleanSty" @click="cleanHanler">
      <svg-icon name="lajitong" size="25px"></svg-icon>
    </div>
    <div class="zm-input__suffix" v-if="suffixIcon">
      <svg-icon :name="suffixIcon" size="30px"></svg-icon>
    </div>
  </div>
  <div v-else class="zm-textarea">
    <textarea
      @input="inputHandler"
      ref="textarea"
      draggable="false"
      :placeholder="placeholder"
      style="height: 100px"
      maxlength="300"
      class="zm-textarea__inner"
    ></textarea>
    <span class="word">{{ residue }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';

// 导出自定义事件，这是vue规定的
export const UPDATE_MODEL_EVENT = 'update:modelValue';

export default defineComponent({
  name: 'ZmInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    prefixIcon: {
      type: String,
      default: null,
    },
    suffixIcon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clean: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
  },
  setup(props, { emit }) {
    const { prefixIcon, suffixIcon, clean, modelValue, type } = props;
    const input = ref<HTMLInputElement>(null);
    const textarea = ref<HTMLInputElement>(null);
    const isEnter = ref(false);
    const inputText = ref(null);
    const residue = ref(300 - modelValue.toString().length);
    onMounted(() => {
      switch (type) {
        case 'text':
          if (typeof modelValue == 'string') {
            input.value.value = modelValue;
          } else if (typeof modelValue == 'number') {
            input.value.value = JSON.stringify(modelValue);
          } else {
            throw new Error('输入框只能传入字符或者数字类型');
          }
          break;

        case 'textarea':
          if (typeof modelValue == 'string') {
            textarea.value.value = modelValue;
          } else if (typeof modelValue == 'number') {
            textarea.value.value = JSON.stringify(modelValue);
          } else {
            throw new Error('输入框只能传入字符或者数字类型');
          }
      }
    });

    // 前后缀样式计算
    const inputSty = computed(() => {
      if (prefixIcon && suffixIcon) {
        return {
          'padding-left': '35px',
          'padding-right': '35px',
        };
      } else if (suffixIcon) {
        return { 'padding-right': '35px' };
      } else if (prefixIcon) {
        return { 'padding-left': '35px' };
      } else {
        return '';
      }
    });
    // 当有后缀时清除样式
    const cleanSty = computed(() => suffixIcon && { right: '35px' });
    const isShowClean = computed(() => {
      if (clean && isEnter.value && inputText.value) {
        return true;
      } else {
        return false;
      }
    });
    const isTextArea = computed(() => props.type === 'textarea');

    // 清空操作
    const cleanHanler = () => {
      // 利用原生dom清除视图
      input.value.value = '';
      // 清除绑定值
      emit(UPDATE_MODEL_EVENT, '');
      inputText.value = null;
      input.value.focus();
      // 触发一个清空事件，供外部使用
      emit('clean');
    };
    const enterInput = () => {
      isEnter.value = true;
    };
    const leaveInput = () => {
      isEnter.value = false;
    };

    // 将值通过自定义事件放出去，这样外面就能使用v-model得到值了
    const inputHandler = (e: any) => {
      const { value } = e.target;
      inputText.value = value;
      emit(UPDATE_MODEL_EVENT, value);
      residue.value = 300 - value.length;
    };

    return {
      inputSty,
      input,
      inputHandler,
      cleanSty,
      isShowClean,
      cleanHanler,
      leaveInput,
      enterInput,
      isTextArea,
      textarea,
      residue,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(input) {
  width: 100%;
  font-size: inherit;
  position: relative;
  display: inline-block;
  @include e(prefix) {
    width: 50px;
    height: 100%;
    position: absolute;
    left: 5px;
    top: 0;
    @include jcc-aic;
  }
  @include e(inner) {
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
  @include e(suffix) {
    position: absolute;
    right: 5px;
    top: 0;
    width: 50px;
    height: 100%;
    @include jcc-aic;
  }
  @include e(clean) {
    position: absolute;
    right: 5px;
    top: 0;
    height: 100%;
    @include jcc-aic;
    cursor: pointer;
  }
}

@include b(textarea) {
  width: 100%;
  font-size: inherit;
  position: relative;
  display: inline-block;
  @include e(inner) {
    border: 1px solid #ccc;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    resize: none;
    width: inherit;
    line-height: 1.5;
    box-sizing: border-box;
    transition: 0.3s all;
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

  .word {
    position: absolute;
    bottom: 5px;
    right: 10px;
    z-index: 1;
    color: #ccc;
  }
}
</style>
