<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-01 17:40:45
-->
<template>
  <transition v-on="on">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { addClass, removeClass } from '@/utils/dom';
export default defineComponent({
  name: 'DrawerTransition',
  setup() {
    return {
      on: {
        beforeEnter(el: HTMLElement) {
          addClass(el, 'drawer-transition-in');
          // el.style.transform = 'translateY(80vh)';
        },
        enter(el: HTMLElement) {
          // el.style.transform = 'translateY(80vh)';
        },
        afterEnter(el: HTMLElement) {
          removeClass(el, 'drawer-transition-in');
        },
        beforeLeave(el: HTMLElement) {
          addClass(el, 'drawer-transition-out');
        },
        leave(el: HTMLElement) {},
        afterLeave(el: HTMLElement) {
          removeClass(el, 'drawer-transition-out');
        },
      },
    };
  },
});
</script>
<style lang="scss" scoped></style>
