<!--
 * @Description: 用户信息设置
 * @Autor: ZmSama
 * @Date: 2021-06-09 15:55:04
-->
<template>
  <div class="zm-user-info">
    <div class="zm-user-info__title">编辑个人信息</div>
    <div class="zm-user-info__message">
      <div class="row-item">
        <div class="label">昵称：</div>
        <zm-input v-model="text" type="text" clean />
      </div>
      <div class="row-item">
        <div class="label">介绍：</div>
        <zm-input type="textarea" v-model="introduce" />
      </div>
      <div class="row-item">
        <div class="label">性别：</div>
        <zm-radio-group v-model="radio" @change="changeHandle">
          <zm-radio label="0">保密</zm-radio>
          <zm-radio label="1">男</zm-radio>
          <zm-radio label="2">女</zm-radio>
        </zm-radio-group>
      </div>
      <div class="row-item">
        <div class="label">生日：</div>
        <div style="width: 33%">
          <zm-select :data="state.y" v-model="selectY" />
        </div>
        <div style="width: 33%">
          <zm-select />
        </div>
        <div style="width: 33%">
          <zm-select />
        </div>
      </div>
      <div class="row-item">
        <div class="label">地区：</div>
        <div style="width: 33%">
          <zm-select />
        </div>
        <div style="width: 33%">
          <zm-select />
        </div>
        <div style="width: 33%"></div>
      </div>

      <div class="bottom">
        <div class="save-button">保存</div>
        <div class="cancel-button" @click="cancleHandler">取消</div>
      </div>
    </div>
    <div class="zm-user-info__avater">头像区域</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import useDataYear from '@/components/select/hook/useDataYear';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'UserInfoEdit',

  setup() {
    const text = ref('廖子默');
    const introduce = ref('缘来缘去终会散，花开花落总归尘');
    const radio = ref('1');
    const selectY = ref(1996);
    const router = useRouter();

    const state = reactive({
      y: useDataYear(),
    });

    const changeHandle = val => {
      console.log(val);
    };

    const cancleHandler = () => {
      router.back();
    };
    return {
      text,
      introduce,
      radio,
      changeHandle,
      state,
      selectY,
      cancleHandler,
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
  grid-template-rows: 60px 3fr;
  column-gap: 50px;
  grid-template-areas:
    'title title'
    'message avater';

  @include e(title) {
    grid-area: title;
    font-size: 24px;
    font-weight: 600;
    line-height: 60px;
  }
  @include e(message) {
    grid-area: message;
    .row-item {
      @include jcc-aic-row;
      height: 80px;
      margin-top: 20px;
      .label {
        width: 80px;
      }
    }
    .bottom {
      position: relative;
      margin-top: 30px;
      height: 50px;
      .save-button {
        position: absolute;
        left: 30%;
        padding: 10px 30px;
        top: 50%;
        transform: translate(0, -50%);
        border: 1px solid #ccc;
        border-radius: 28px;
        cursor: pointer;
        background-color: rgb(255, 47, 47);
        color: #fff;
      }
      .cancel-button {
        position: absolute;
        left: 55%;
        top: 50%;
        padding: 10px 30px;
        transform: translate(0, -50%);
        border: 1px solid #ccc;
        border-radius: 28px;
        cursor: pointer;
      }
    }
  }
  @include e(avater) {
    grid-area: avater;
  }
}
</style>
