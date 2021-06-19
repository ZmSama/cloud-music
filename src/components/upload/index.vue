<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-18 16:13:53
-->
<template>
  <div class="zm-upload" ref="draggerArea">
    <div class="zm-upload__avater">
      <img src="@/assets/img/avater.jpg" alt="" srcset="" />
    </div>
    <div class="zm-upload__tips">{{ tips }}</div>
    <div class="zm-upload__button">
      <zm-popper-button size="mini" @click="uploadSubmit">上传</zm-popper-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import throttle from '@/utils/throttle';
export default defineComponent({
  name: 'ZmUpload',
  setup() {
    const draggerArea = ref<HTMLElement>();
    const tips = ref('拖动图片在此上传');
    const uploadSubmit = e => {
      console.log(e);
    };

    // 拖东西悬浮在虚线框时,配合节流函数降低消耗
    const draggerEnter = () => {
      // draggerArea.value.addEventListener(
      //   'dragover',
      //   throttle(() => {
      //     // 把虚线变成实线
      //     draggerArea.value.style.border = '3px solid rgb(255, 47, 47)';
      //     console.log('enter');
      //   })
      // );
      draggerArea.value.addEventListener('dragover', () => {
        // 把虚线变成实线
        draggerArea.value.style.border = '3px solid rgb(255, 47, 47)';
        tips.value = '放手，可以上传了';
        console.log('enter');
      });
    };

    // 拖东西离开虚线框时
    const draggerLeave = throttle(() => {
      draggerArea.value.addEventListener('dragleave', () => {
        console.log('leave');
        draggerArea.value.style.border = '3px dashed rgb(255, 47, 47)';
        tips.value = '拖动图片在此上传';
      });
    });

    onMounted(() => {
      draggerEnter();
      draggerLeave();
    });
    return {
      uploadSubmit,
      draggerArea,
      tips,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(upload) {
  width: 500px;
  height: 500px;
  border: 3px dashed rgb(255, 47, 47);
  border-radius: 15px;
  position: relative;
  @include e(avater) {
    width: 250px;
    height: 250px;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }
  @include e(tips) {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    font-family: sans-serif;
    font-weight: 600;
    font-size: 24px;
  }
  @include e(button) {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
