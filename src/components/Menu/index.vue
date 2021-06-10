<!--
 * @Description: 导航条（左侧）
 * @Autor: ZmSama
 * @Date: 2021-05-19 15:13:58
-->
<template>
  <div class="zm-menu">
    <div class="zm-menu__content">
      <div class="title" @click="toggleCreateSongList" v-if="title">
        <span>{{ title }}</span>
        <div :class="currentTangleState" class="tangle"></div>
      </div>
      <collapse-transition>
        <div v-show="isActive">
          <slot></slot>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'Menu',
  props: {
    title: {
      type: String,
      default: '标题一',
    },
  },
  setup() {
    const isActive = ref(true);
    const currentTangleState = computed(() => !isActive.value && 'is-open');
    //   切换创建的歌单
    const toggleCreateSongList = () => {
      isActive.value = !isActive.value;
    };
    return {
      toggleCreateSongList,
      currentTangleState,
      isActive,
    };
  },
});
</script>
<style lang="scss" scoped></style>
