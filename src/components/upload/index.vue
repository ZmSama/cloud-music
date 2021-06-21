<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-06-18 16:13:53
-->
<template>
  <div class="zm-upload" ref="draggerArea">
    <div class="zm-upload__avater">
      <svg-icon name="lianxiaolianmanyi-" size="200"></svg-icon>
    </div>
    <div class="zm-upload__tips">{{ tips }}</div>
    <div class="zm-upload__button">
      <zm-popper-button size="mini" @click="uploadSubmit">上传</zm-popper-button>
      <input type="file" hidden ref="inputRef" @change="inputChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import throttle from '@/utils/throttle';
import Message from '@/components/message/src/message';
import { addClass, removeClass } from '@/utils/dom';
export default defineComponent({
  name: 'ZmUpload',
  setup() {
    const draggerArea = ref<HTMLElement>();
    const tips = ref('拖动图片在此上传');
    const inputRef = ref<HTMLElement>();

    // 点击上传按钮，实际调用输入框的点击事件
    const uploadSubmit = e => {
      inputRef.value.click();
      console.log(e);
    };

    // 输入框事件
    const inputChange = (e: InputEvent) => {
      let file = e.target['files'][0] as File;
      let type = file.type;
      validate(type, file);
    };

    // 拖东西悬浮在虚线框时
    const draggerEnter = () => {
      draggerArea.value.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
        // 把虚线变成实线
        addClass(draggerArea.value, 'is-active');
        // draggerArea.value.style.border = '3px solid rgb(255, 47, 47)';
        tips.value = '放手，可以上传了';
      });
    };

    // 拖东西离开虚线框时
    const draggerLeave = throttle(() => {
      draggerArea.value.addEventListener('dragleave', () => {
        removeClass(draggerArea.value, 'is-active');
        tips.value = '拖动图片在此上传';
      });
    });

    // 拖东西在框内放下时
    const dragger = () => {
      draggerArea.value.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        let fileType = file.type;
        validate(fileType, file);
      });
    };

    // 校验并读取方法
    const validate = (type, file) => {
      let validation = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validation.includes(type)) {
        Message({
          type: 'error',
          message: '只允许上传图片格式',
        });
      } else {
        // 构造一个文件读取对象
        let fileReader = new FileReader();
        // 把读取到的图片转化成base64编码
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          draggerArea.value.innerHTML = `<img src="${fileReader.result}">`;
        };
      }
    };

    onMounted(() => {
      draggerEnter();
      draggerLeave();
      dragger();
    });
    return {
      uploadSubmit,
      draggerArea,
      tips,
      inputRef,
      inputChange,
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
  overflow: hidden;
  @include when(active) {
    border: 3px solid rgb(255, 47, 47);
  }
  @include e(avater) {
    width: 250px;
    height: 250px;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    @include jcc-aic;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
