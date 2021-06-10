<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-02 14:20:24
-->
<template>
  <teleport to="body">
    <drawer-transition>
      <div class="zm-drawer" v-show="visible">
        <div class="zm-drawer__content" :style="'height: ' + drawerSize">
          <template v-if="rendered">
            <slot></slot>
          </template>
        </div>
      </div>
    </drawer-transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
  name: 'Drawer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: '100%',
    },
  },
  setup(props, ctx) {
    const rendered = ref(false);
    const drawerSize = computed(() =>
      typeof props.size === 'number' ? `${props.size}px` : props.size
    );

    onMounted(() => {
      rendered.value = true;
    });

    return {
      rendered,
      drawerSize,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(drawer) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1998;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  @include e(content) {
    position: absolute;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    bottom: 0;
  }
}
</style>
