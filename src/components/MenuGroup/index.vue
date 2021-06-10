<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-20 17:19:50
-->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, onMounted, ref } from 'vue';
import mitt from 'mitt';
import { MenuRootProvider } from '../Menu/menu';
export default defineComponent({
  name: 'MenuGroup',
  setup() {
    const activeIndex = ref(1);

    // 实例化一个事件总线，vue3官方推荐mitt
    const Emitter = mitt();

    // 在生命周期里面监听一下事件总线的内容
    onMounted(() => {
      // 监听menu-item传递回来的消息
      Emitter.on('menu-group-item-click', res => {
        activeIndex.value = res;
      });
    });

    // 提供一些总要的内容给不确定的子组件，一般就是动态子组件或者咱们这里的插槽内容
    provide<MenuRootProvider>('menu-group', {
      activeIndex,
      menuEmiter: Emitter.emit,
      menuOn: Emitter.on,
    });
  },
});
</script>
<style lang="scss" scoped></style>
