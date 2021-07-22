<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-10 22:49:26
-->
<template>
  <div class="zm-header">
    <div class="zm-header__logo">
      <svg-icon name="wangyiyun1" size="25" color="blue" />
    </div>
    <div class="zm-header__brand">网易云音乐</div>
    <div class="zm-header__options-wrap">
      <div class="zm-router">
        <div class="zm-router__prev" @click="routerBack">
          <svg-icon name="left_back" color="black"></svg-icon>
        </div>
        <div class="zm-router__next">
          <svg-icon name="left_back" color="#fff"></svg-icon>
        </div>
      </div>
      <!-- 搜索框 -->
      <input-select
        :hotdata="hotdata"
        @selectHistoryItem="selectHistoryItem"
        @keydown="KedownHandle"
      />
    </div>

    <!-- 用户区域 -->
    <div class="zm-userinfo">
      <div class="zm-userinfo__avater" @click="toUserInfoDetails">
        <el-avatar size="medium" :src="info?.avater" icon="el-icon-user"></el-avatar>
      </div>
      <div class="zm-userinfo__username" @click.stop="toUserInfo">
        {{ info ? info.name : '未登录' }}
      </div>
      <div class="zm-userinfo__them" @click="testCookie">
        <svg-icon name="them" size="22" color="#fff" />
      </div>
      <div class="zm-userinfo__message">
        <svg-icon name="message" size="24" color="#fff" />
        <div class="tips">99</div>
      </div>
      <transition name="zm-card">
        <div class="zm-userinfo-card" v-show="isOpenUserinfo" v-clickoutside="handleCloseDrective">
          <div class="zm-userinfo-card__header">
            <div class="first-row">
              <div>0</div>
              <div>4</div>
              <div>4</div>
            </div>
            <div class="second-row">
              <div>动态</div>
              <div>关注</div>
              <div>粉丝</div>
            </div>
            <div class="sin-button">签到</div>
          </div>
          <div class="zm-userinfo-card__footer">
            <card-item suffixText="未订购" size="33px" label="会员中心" />
            <card-item prefix="dengji" size="25px" suffixText="Lv.9" label="会员中心" />
            <card-item prefix="shangcheng" size="20px" label="商城" :isBorder="true" />
            <card-item
              @click="gotoUserInfoEdit"
              prefix="gerenxinxi"
              size="25px"
              label="个人信息设置"
            />
            <card-item
              prefix="bangdingshejiaozhanghao"
              size="22px"
              label="绑定社交账号"
              :isBorder="true"
              suffixIcon="weixin"
            />
            <card-item prefix="tuichudenglu" size="20px" label="退出登录" />
          </div>
        </div>
      </transition>
    </div>

    <el-dialog v-model="isOpenLogin" @close="loginBoxClose" :modal="false" width="400px" center>
      <div class="login-card">
        <div class="in-card" v-if="isQrCodeType">
          <div class="title">
            <span>扫码登陆</span>
          </div>
          <div class="show-box">
            <div class="left-cover">
              <img src="@/assets/img/saoma.png" alt="" />
            </div>
            <div class="qrcode">
              <div class="code">
                <img :src="qrcode" alt="" />
              </div>
              <span>使用网易云APP扫码登陆</span>
            </div>
            <!-- 这里是二维码过期之后出现 -->
            <div class="timeout-tips" v-if="isTimeout">
              <span>二维码已失效</span>
              <div>点击刷新</div>
            </div>
          </div>

          <div class="bottom" @click="changeLoginType">
            <span>选择其他登陆方式</span>
            <i class="el-icon-s-promotion"></i>
          </div>
        </div>

        <div class="in-card" v-else>
          <div class="top-button" v-if="isRegister" @click="toggleLogin">
            <i class="iconfont icon-prev"></i>
            <span>返回登陆</span>
          </div>
          <div class="top-icon">
            <img src="@/assets/img/login-phone.png" alt="" />
          </div>
          <div class="form">
            <el-form ref="formRef" :model="loginFrom" :rules="rules" label-width="0px">
              <el-form-item prop="phone">
                <el-input
                  v-model="loginFrom.phone"
                  placeholder="请输入手机号"
                  prefix-icon="el-icon-phone"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-if="!isRegister"
                  prefix-icon="el-icon-lock"
                  placeholder="请输入密码"
                  show-password
                  v-model="loginFrom.password"
                ></el-input>
                <el-input
                  v-else
                  prefix-icon="el-icon-lock"
                  placeholder="请设置密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item style="text-align: left" v-if="!isRegister">
                <el-checkbox fill="rgb(255,47,47)">记住密码</el-checkbox>
              </el-form-item>

              <el-form-item style="text-align: center">
                <el-button class="customer-button" @click="loginOrRegist">
                  {{ isRegister ? '注 册' : '登 陆' }}
                </el-button>
              </el-form-item>
              <el-form-item style="text-align: center" v-if="!isRegister">
                <a href="#" @click="toggleRegister">注册</a>
              </el-form-item>
            </el-form>
          </div>
          <div class="bottom-code" @click="toggleQrLogin">
            <i class="iconfont icon-ico"></i>
            <span>返回扫码登陆</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs, ref } from 'vue';
import clickoutside from '@/directives/clickoutside';
import CardItem from './CardItem.vue';
import { useRouter } from 'vue-router';
import { GET_HOT_SEARCH_LIST } from '@/api/modules/music';
import useLogin from '../hooks/useLogin';

export default defineComponent({
  name: 'Header',
  components: {
    CardItem,
  },
  directives: {
    clickoutside,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      countryCode: '',
      hotdata: [],
      avater: '',
    });
    const formRef = ref<HTMLElement>();
    const {
      isOpenUserinfo,
      isOpenLogin,
      qrcode,
      key,
      isQrCodeType,
      isRegister,
      isTimeout,
      timer,
      info,
      loginFrom,
      toUserInfo,
      handleCloseDrective,
      gotoUserInfoEdit,
      loginBoxClose,
      toggleRegister,
      toggleLogin,
      toggleQrLogin,
      changeLoginType,
      loginOrRegist,
    } = useLogin(formRef);
    const reload = inject('reload') as Function;
    const rules = {
      phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    };

    // 选择历史条目
    const selectHistoryItem = (item: any) => {
      router.push({
        name: 'MusicSearchDetails',
        params: {
          info: item,
        },
      });
      reload();
    };

    // 输入确定
    const KedownHandle = val => {
      router.push({
        name: 'MusicSearchDetails',
        params: {
          info: val,
        },
      });
      reload();
    };
    // 路由返回
    const routerBack = () => {
      router.back();
    };

    // 得到热搜列表
    const getHotData = async () => {
      let res = await GET_HOT_SEARCH_LIST();
      state.hotdata = res.data.data;
    };

    const toUserInfoDetails = () => {};

    // 根据key得到
    getHotData();
    return {
      isOpenUserinfo,
      isOpenLogin,
      qrcode,
      key,
      isQrCodeType,
      isRegister,
      isTimeout,
      timer,
      info,
      rules,
      selectHistoryItem,
      toUserInfo,
      handleCloseDrective,
      gotoUserInfoEdit,
      routerBack,
      KedownHandle,
      ...toRefs(state),
      changeLoginType,
      toggleRegister,
      toggleLogin,
      toggleQrLogin,
      loginBoxClose,
      toUserInfoDetails,
      loginOrRegist,
      formRef,
      loginFrom,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(header) {
  display: grid;
  grid-template-columns: 40px 140px 3fr 1fr;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  width: 100vw;
  height: 60px;
  background-color: $red;
  @include e(logo) {
    width: 40px;
    height: 40px;
    @include jcc-aic;
    border-radius: 40px;
    background-color: #fff;
  }

  @include e(brand) {
    padding-left: 10px;
    font-size: 24px;
    color: #fff;
    font-family: '黑体';
  }

  @include e(options-wrap) {
    @include jcc-aic;
    margin-left: 200px;
    width: 450px;
    height: 100%;
  }
}

@include b(userinfo) {
  width: 400px;
  position: relative;
  @include jcc-aic-row;
  @include e(avater) {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
  @include e(username) {
    font-size: 15px;
    margin-left: 5px;
    width: 64px;
    color: rgb(248, 186, 186);
    cursor: pointer;
    position: relative;
    &:hover {
      color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0px;
      top: 5px;
      height: 0;
      width: 0;
      border-top: 7px solid rgb(248, 186, 186);
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
    }
  }
  @include e(them) {
    margin-left: 100px;
    cursor: pointer;
  }
  @include e(message) {
    margin-left: 50px;
    cursor: pointer;
    position: relative;
    &:hover .them-icon {
      color: #fff;
    }
    .tips {
      position: absolute;
      font-size: 8px;
      color: $red;
      right: -5px;
      top: 0;
      height: 18px;
      width: 18px;
      background-color: #fff;
      border-radius: 50%;
      @include jcc-aic;
    }
  }

  @include b(userinfo-card) {
    position: absolute;
    top: 44px;
    left: -80px;
    width: 320px;
    z-index: 2021;
    height: 450px;
    background-color: #fff;
    box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    transition: 0.4s all;
    @include e(header) {
      height: 130px;
      padding: 10px;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .first-row {
        @include jcc-aic-row;
        margin-top: 20px;
        div {
          flex: 1;
          @include jcc-aic;
        }
      }
      .second-row {
        @extend .first-row;
        margin-top: 5px;
        font-size: 14px;
        color: #ccc;
      }
      .sin-button {
        width: 80px;
        height: 30px;
        border: 1px solid #ccc;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        @include jcc-aic;
        font-size: 16px;
        border-radius: 20px;
        color: #ccc;
        cursor: pointer;
      }
    }

    @include e(footer) {
      @include jcc-aic;
      flex-direction: column;
      div {
        height: 50px;
        width: 100%;
      }
      .vip {
        @include jcc-aic-row;
        border-bottom: 1px solid #000;
      }
    }
  }
}

@include b(router) {
  @include jcc-aic-row;
  @include e(prev) {
    width: 30px;
    height: 30px;
    border-radius: 40px;
    @include jcc-aic;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }

  @include e(next) {
    @extend .zm-router__prev;
    transform: rotate(180deg);
    margin-left: 10px;
  }
}

.login-card {
  width: 100%;
  height: 600px;
  @include jcc-aic;
  flex-direction: column;
  position: relative;
  .in-card {
    width: 100%;
    height: 600px;
    @include jcc-aic;
    flex-direction: column;
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .show-box {
      height: 60%;
      width: 80%;
      @include jcc-aic-row;
      cursor: pointer;
      position: relative;
      z-index: 0;
      &:hover .left-cover {
        transition: 0.6s all;
        transform: translate(-100%, -50%);
        opacity: 1;
      }
      &:hover .qrcode {
        transition: 0.6s all;
        transform: translate(-20%, -50%) scale(0.6);
      }
      .left-cover {
        width: auto;
        height: 100%;
        opacity: 0;
        background-color: blueviolet;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.6s all;
        img {
          object-fit: cover;
        }
      }
      .qrcode {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.6s all ease-out;
        @include jcc-aic;
        flex-direction: column;
        .code {
          width: 350px;
          height: 350px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        span {
          font-size: 18px;
          padding-top: 10px;
        }
      }
      .timeout-tips {
        position: absolute;
        left: -15px;
        top: -15px;
        right: -15px;
        bottom: -15px;
        background-color: rgba(0, 0, 0, 0.7);
        @include jcc-aic;
        flex-direction: column;
        z-index: 2;
        span {
          font-size: 20px;
          color: #fff;
        }
        div {
          margin-top: 10px;
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          border-radius: 6px;
          background: rgb(12, 115, 194);
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
    .top-icon {
      top: 10px;
    }
    .form {
      margin-top: 30px;
      width: 70%;
      .customer-button {
        background-color: rgb(255, 47, 47);
        color: #fff;
        font-size: 18px;
        width: 100%;
      }
      a {
        color: #000;
      }
    }
    .bottom-code {
      position: absolute;
      left: 0;
      bottom: 0;
      @include jcc-aic-row;
      cursor: pointer;
      i {
        font-size: 30px;
        color: red;
      }
    }
    .top-button {
      position: absolute;
      left: 0;
      top: 0;
      @include jcc-aic-row;
      cursor: pointer;
    }
  }
}

img {
  height: 100%;
  width: 100%;
}
.zm-card-enter-from {
  transform: translate(-20px, -10px);
  opacity: 0;
}
.zm-card-enter-to {
  transform: translate(0, 0);
  opacity: 1;
}
.zm-card-leave-from {
  transform: translate(-20px, -10px);
  opacity: 1;
}
.zm-card-leave-to {
  transform: translate(20px, -10px);
  opacity: 0;
}
</style>
