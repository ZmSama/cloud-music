<!--
 * @Description: 用户信息设置
 * @Autor: ZmSama
 * @Date: 2021-06-09 15:55:04
-->
<template>
  <div class="zm-user-info">
    <div>用户信息设置界面</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserInfoEdit',
});
</script>
<style lang="scss" scoped>
@include b(user-info) {
  background-color: aqua;
  width: 100%;
  height: 100%;
}
</style>
