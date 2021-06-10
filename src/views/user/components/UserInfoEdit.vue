<!--
 * @Description: 用户信息设置
 * @Autor: ZmSama
 * @Date: 2021-06-09 15:55:04
-->
<template>
  <div class="zm-user-info">
    <div class="zm-user-info__title">编辑个人信息</div>
    <div class="zm-user-info__message">
      <div class="username">
        <span>昵称:</span>
        <zm-input v-model="text" clean />
      </div>
    </div>
    <div class="zm-user-info__avater">头像区域</div>
    <div class="zm-user-info__footer">底部按钮</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UserInfoEdit',
  setup() {
    const text = ref('廖子默');

    return {
      text,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(user-info) {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 60px 3fr 1fr;
  column-gap: 50px;
  grid-template-areas:
    'title title'
    'message avater'
    'footer footer';

  @include e(title) {
    grid-area: title;
    font-size: 24px;
    font-weight: 600;
    line-height: 60px;
  }
  @include e(message) {
    grid-area: message;
    .username {
      @include jcc-aic-row;
      span {
        width: 80px;
      }
    }
  }
  @include e(avater) {
    grid-area: avater;
  }
  @include e(footer) {
    grid-area: footer;
  }
}
</style>
