<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-03 10:35:05
-->
<template>
  <transition name="message" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      class="zm-message"
      :class="classType"
      :style="offsetSty"
      v-show="visible"
      @mouseenter="removeTimer"
      @mouseleave="continueTimer"
    >
      <svg-icon :name="iconType" size="25px"></svg-icon>
      <span class="zm-message__text">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import { InfoType } from './types';
import SvgIcon from '../../SvgIcon/index.vue';
export default defineComponent({
  name: 'Message',
  components: {
    SvgIcon,
  },
  props: {
    duration: {
      type: Number,
      default: 3000,
    },
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<InfoType>,
      default: 'info',
    },
    onClose: {
      type: Function as PropType<() => void>,
    },
    zIndex: {
      type: Number,
      default: 2035,
    },
    icon: {
      type: String,
      default: 'info',
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  setup(props, ctx) {
    const visible = ref(false);
    let timer = null;

    // 计算类型
    const classType = computed(() => 'zm-message--' + props.type);

    const iconType = computed(() => {
      switch (props.type) {
        case 'info':
          return 'bangzhu';
        case 'success':
          return 'querenzhengque';
        case 'warning':
          return 'jinggao';
        case 'error':
          return 'cuowu';
      }
    });

    // 计算偏移值
    const offsetSty = computed(() => {
      return {
        top: props.offset + 'px',
      };
    });
    // 开启定时关闭
    const startTime = () => {
      timer = setTimeout(() => {
        visible.value = false;
      }, props.duration);
    };

    const removeTimer = () => {
      clearTimeout(timer);
      timer = null;
    };

    const continueTimer = () => {
      startTime();
    };
    onMounted(() => {
      visible.value = true;
      startTime();
    });

    onUnmounted(() => {
      clearTimeout(timer);
    });
    return {
      visible,
      classType,
      offsetSty,
      removeTimer,
      continueTimer,
      iconType,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(message) {
  z-index: 2035;
  color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  line-height: 60px;
  padding: 10px 60px;
  border-radius: 3px;
  transform: translateX(-50%);
  transition: 0.3s all linear;
  cursor: pointer;
  @include jcc-aic;
  @include e(text) {
    padding-left: 10px;
  }
  @include m(info) {
    background-color: rgb(56, 56, 56);
  }
  @include m(success) {
    background-color: rgb(56, 56, 56);
  }
  @include m(warning) {
    background-color: rgb(56, 56, 56);
  }
  @include m(error) {
    background-color: rgb(56, 56, 56);
  }
}

// 动画进入前
.message-enter-from {
  transform: translate(-50%, -100%);
  opacity: 0;
}
// 进入时
.message-enter-active {
  opacity: 0.5;
}
// 完全进入
.message-enter-to {
  opacity: 1;
}

.message-leave-from {
  opacity: 1;
}
.message-leave-active {
  opacity: 0.5;
  transform: translateX(10%);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(20%);
}
</style>
