<!--
 * @Description: 导航栏子项
 * @Autor: ZmSama
 * @Date: 2021-05-19 15:24:33
-->
<template>
  <div class="row" :class="[activeClass, size]" @click="clickHandler">
    <svg-icon v-if="icon" :name="icon" :size="iconSize" :color="iconColor"></svg-icon>
    <div class="label-class">
      <slot>选项一</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { MenuRootProvider } from '../Menu/menu';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'MenuItem',
  props: {
    color: {
      type: String,
      default: 'black',
    },
    size: {
      type: String,
      default: 'normal',
    },
    icon: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: '22px',
    },
    iconColor: {
      type: String,
      default: 'red',
    },
    routeKey: {
      type: String,
      default: null,
      requer: true,
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    // 插入menu-group提供的参数(可能是空)
    const MenuGroup = inject<MenuRootProvider>('menu-group') as MenuRootProvider;
    const activeClass = computed(() => props.index === MenuGroup.activeIndex.value && 'is-active');

    const router = useRouter();

    const clickHandler = () => {
      console.log('此时index', MenuGroup.activeIndex);
      // 将当前点击的传递给menu-group
      MenuGroup.menuEmiter('menu-group-item-click', props.index);
      props.routeKey && router.push(props.routeKey);
      // console.log(props.routeKey);
    };
    return {
      clickHandler,
      activeClass,
    };
  },
});
</script>
<style lang="scss" scoped></style>
