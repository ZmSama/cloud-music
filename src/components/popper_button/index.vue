<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-19 10:59:34
-->
<template>
  <a :style="sty" class="zm-popper-button" :class="cls" href="#" ref="uploadButton">
    <slot>按钮一</slot>
  </a>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

export default defineComponent({
  name: 'ZmPopperButton',
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    background: {
      type: String,
      default: 'linear-gradient(135deg, #dd7e66, #ec5091)',
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const uploadButton = ref<HTMLElement>();

    const { background, color, size } = props;

    const sty = computed(() => {
      return {
        color,
        background,
      };
    });

    const cls = computed(() => {
      switch (size) {
        case 'mini':
          return 'zm-popper-button--mini';
        case 'large':
          return 'zm-popper-button--large';
        default:
          'zm-popper-button--medinum';
      }
    });

    onMounted(() => {
      uploadButton.value.addEventListener('click', (e: MouseEvent) => {
        emit('click', e);
        let x = e.offsetX;
        let y = e.offsetY;
        // 根据这个起点创建一个span用来做波纹效果
        let span = document.createElement('span');
        span.className = 'popper-button-span';
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        uploadButton.value.appendChild(span);
        setTimeout(() => {
          uploadButton.value.removeChild(span);
        }, 700);
      });
    });

    return {
      uploadButton,
      sty,
      cls,
    };
  },
});
</script>
