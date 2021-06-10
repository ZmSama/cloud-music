<!--
 * @Description: 推荐mv小组件
 * @Autor: ZmSama
 * @Date: 2021-06-04 10:48:13
-->
<template>
  <div class="zm-recommend-mv-item" @mouseenter="enterHandler" @mouseleave="leaveHandler">
    <div class="zm-recommend-mv-item__cover">
      <img
        src="http://p4.music.126.net/nqEkothDhOrKfupxYOzmpA==/109951165611132172.jpg?param=200y200"
        alt=""
      />
    </div>
    <div class="zm-recommend-mv-item__name">
      因为有你接送地方窘事递归阿济格老公就是几个哦根本giigngi
    </div>
    <div class="zm-recommend-mv-item__singer">李吴</div>

    <div class="zm-recommend-mv-item__playnum" v-show="!isTips">
      <svg-icon name="bofang" size="20px" color="#fff"></svg-icon>
      44万
    </div>
    <transition name="zm-recommend-mv-item-tips">
      <div class="zm-recommend-mv-item__tips" v-show="isTips">最新热门mv推荐</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RecommendMvItem',
  setup() {
    const isTips = ref(false);

    const enterHandler = () => {
      isTips.value = true;
    };

    const leaveHandler = () => {
      isTips.value = false;
    };

    return {
      isTips,
      enterHandler,
      leaveHandler,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(recommend-mv-item) {
  position: relative;
  cursor: pointer;
  @include e(cover) {
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @include e(name) {
    padding-top: 5px;
    height: 25px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //这里控制多少行
  }
  @include e(singer) {
    padding-top: 10px;
    font-size: 14px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //这里控制多少行
    color: rgba($color: #000000, $alpha: 0.4);
  }
  @include e(playnum) {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    font-size: 16px;
    @include jcc-aic-row;
  }
  @include e(tips) {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    overflow: hidden;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    width: 100%;
    color: #fff;
    z-index: 2;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: 0.3s all;
  }
}

.zm-recommend-mv-item-tips-enter-from,
.zm-recommend-mv-item-tips-leave-to {
  height: 0;
  overflow: hidden;
  opacity: 0;
}
.zm-recommend-mv-item-tips-enter-active,
.zm-recommend-mv-item-tips-leave-active {
  height: 20px;
}
.zm-recommend-mv-item-tips-enter-to,
.zm-recommend-mv-item-tips-leave-from {
  height: 40px;
}
</style>
