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
      <div class="zm-userinfo__avater">
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
            <el-form ref="form" label-width="0px">
              <el-form-item>
                <el-input placeholder="请输入手机号" prefix-icon="el-icon-phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-if="!isRegister"
                  prefix-icon="el-icon-lock"
                  placeholder="请输入密码"
                  show-password
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
                <el-button class="customer-button">
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
import { defineComponent, watch, inject, reactive, toRefs, onUnmounted, onMounted } from 'vue';
import clickoutside from '@/directives/clickoutside';
import CardItem from './CardItem.vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/index';
import { GET_HOT_SEARCH_LIST } from '@/api/modules/music';
import {
  GET_QR_KEY,
  CREATE_QR_CODE_BY_KEY,
  LOOP_CHECK_QRCODE,
  GET_LOGIN_STATUS,
  GET_USER_SONG_LIST,
} from '@/api/modules/user';
import { getItem } from '@/utils/localStorage';
import { USER_INFO_KEY } from '@/utils/local-key';
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
    const reload = inject('reload') as Function;

    const state = reactive({
      isOpenUserinfo: false,
      isOpenLogin: false,
      isQrCodeType: true,
      isRegister: false,
      isTimeout: false,
      countryCode: '',
      hotdata: [],
      avater: '',
      qrcode: '',
      key: '',
      timer: null,
    });

    const store = useStore();
    const { info } = toRefs(store.state.userModel);

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

    // 打开用户信息下拉框,如果不是登陆状态那就要加载打开登陆框
    const toUserInfo = () => {
      if (info.value) {
        state.isOpenUserinfo = !state.isOpenUserinfo;
      } else {
        state.isOpenLogin = true;
        // 此时加载一个key，用来生成二维码的key
        getQrKey().then((res: string) => {
          getQrcodeByKey(res);
        });
      }
    };
    // 关闭用户信息下拉框
    const handleCloseDrective = () => {
      state.isOpenUserinfo = false;
      state.isOpenLogin = false;
    };

    // 路由返回
    const routerBack = () => {
      router.back();
    };

    // 去用户信息设置界面
    const gotoUserInfoEdit = () => {
      router.push({
        name: 'UsreInfoEdit',
        params: {
          uid: 1,
        },
      });
      state.isOpenUserinfo = false;
    };

    // 得到热搜列表
    const getHotData = async () => {
      let res = await GET_HOT_SEARCH_LIST();
      state.hotdata = res.data.data;
    };

    // 改变登陆方式
    const changeLoginType = () => {
      state.isQrCodeType = false;
    };

    // 切换到注册状态
    const toggleRegister = () => {
      state.isRegister = true;
    };
    // 切换到登陆状态
    const toggleLogin = () => {
      state.isRegister = false;
    };
    // 切换回二维码登录
    const toggleQrLogin = () => {
      state.isQrCodeType = true;
    };

    // 得到key
    const getQrKey = async () => {
      let res = await GET_QR_KEY();
      if (res.data) {
        state.key = res.data.data.unikey;
        return new Promise(resolve => {
          resolve(res.data.data.unikey);
        });
      }
    };

    // 根据key得到二维码
    const getQrcodeByKey = async (key: string) => {
      let res = await CREATE_QR_CODE_BY_KEY({
        key,
        qrimg: true,
      });
      if (res.data) {
        state.qrcode = res.data.data.qrimg;
      }
    };

    // 根据生成的key轮询校验二维码状态
    const loopCheckKye = async (key: string) => {
      let res = await LOOP_CHECK_QRCODE({
        key,
      });
      // 检测状态
      if (res.data.code === 800) {
        // 过期了
        state.isTimeout = true;
      } else if (res.data.code === 803) {
        // 授权成功了，成功登陆，清除定时器
        clearInterval(state.timer);
        state.timer = null;
        // 关闭这个登陆框
        state.isOpenLogin = false;
        // 此时再发起一个检查登陆状态的请求，可以得到用户信息
        checkLoginStatu();
      }
    };

    // 检查登陆状态
    const checkLoginStatu = async () => {
      let res = await GET_LOGIN_STATUS();
      // 要这个account有值说明携带了cookie
      if (res.data.data.account) {
        let profile = res.data.data.profile;
        // 在这里提交vuex记录登陆状态，同事要把用户信息持久化到本地
        let info = {
          name: profile.nickname,
          id: profile.userId,
          avater: profile.avatarUrl,
          signature: profile.signature,
          gender: profile.gender,
          city: profile.city,
          province: profile.province,
        };
        store.commit('userModel/SET_USER_INFO', info);
      }
    };

    // 登陆卡片关闭时重置一些状态
    const loginBoxClose = () => {
      clearInterval(state.timer);
      state.timer = null;
      state.isQrCodeType = true;
      state.isRegister = false;
      state.isTimeout = false;
    };

    const testCookie = async () => {
      let res = await GET_USER_SONG_LIST({ uid: info.value.id });
      console.log(res);
    };

    // 监听二维码，轮询一个校验二维码状态的接口
    watch(
      () => state.qrcode,
      () => {
        state.timer = setInterval(() => {
          loopCheckKye(state.key);
        }, 1000);
      }
    );

    //  当页面加载完毕时，检测本地是否有用户信息，有的话加载回vuex
    onMounted(() => {
      getItem(USER_INFO_KEY).then(res => {
        if (res) {
          store.commit('userModel/SET_USER_INFO', res);
        }
      });
    });

    onUnmounted(() => {
      clearInterval(state.timer);
      state.timer = null;
    });

    // 根据key得到
    getHotData();
    return {
      selectHistoryItem,
      toUserInfo,
      handleCloseDrective,
      gotoUserInfoEdit,
      routerBack,
      KedownHandle,
      ...toRefs(state),
      info,
      changeLoginType,
      toggleRegister,
      toggleLogin,
      toggleQrLogin,
      loginBoxClose,
      testCookie,
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
