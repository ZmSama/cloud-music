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
        :historydata="historydata"
        :hotdata="hotdata"
        @selectHistoryItem="selectHistoryItem"
        @keydown="KedownHandle"
      />
    </div>

    <!-- 用户区域 -->
    <div class="zm-userinfo">
      <div class="zm-userinfo__avater">
        <img src="@/assets/img/avater.jpg" alt="" srcset="" />
      </div>
      <div class="zm-userinfo__username" @click.stop="toUserInfo">廖子默</div>
      <div class="zm-userinfo__them">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw, ref, computed, onMounted, inject } from 'vue';
import clickoutside from '@/directives/clickoutside';
import CardItem from './CardItem.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Header',
  components: {
    CardItem,
  },
  directives: {
    clickoutside,
  },
  setup() {
    const historydata = [
      {
        id: 1,
        text: '玫瑰花的葬礼',
      },
      {
        id: 2,
        text: '你的名字',
      },
      {
        id: 3,
        text: '还是会想你',
      },
      {
        id: 4,
        text: '日不落',
      },
      {
        id: 5,
        text: '起风了',
      },
      {
        id: 6,
        text: 'lover',
      },
      {
        id: 7,
        text: '娱乐天空',
      },
      {
        id: 8,
        text: '大城小爱',
      },
      {
        id: 9,
        text: '花太阳彩虹你',
      },
      {
        id: 10,
        text: '冰柜',
      },
      {
        id: 11,
        text: '沦陷',
      },
    ];
    const hotdata = [
      {
        id: 1,
        name: '飘向北方',
        type: 'new',
        hotNum: 28455458,
        des: '梦想在哪里，他们就飘到哪里',
      },
      {
        id: 2,
        name: '你的名字',
        type: 'hot',
        hotNum: 4851555,
        des: '你的名字，是我一生的故事',
      },
      {
        id: 3,
        name: '手放开',
        type: 'up',
        hotNum: 2860737,
        des: '你给我最后的疼爱，是手放开',
      },
      {
        id: 3,
        name: '溯',
        hotNum: 2527163,
        des: '慵懒歌曲，失眠首选',
      },
    ];
    const isOpenUserinfo = ref(false);

    const router = useRouter();
    const reload = inject('reload') as Function;

    const selectHistoryItem = (item: any) => {
      router.push({
        name: 'MusicSearchDetails',
      });
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
    const toUserInfo = () => {
      console.log(111);
      isOpenUserinfo.value = !isOpenUserinfo.value;
      // router.push('/userInfo');
    };

    const handleCloseDrective = () => {
      isOpenUserinfo.value = false;
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
      isOpenUserinfo.value = false;
    };

    return {
      historydata,
      hotdata,
      selectHistoryItem,
      toUserInfo,
      isOpenUserinfo,
      handleCloseDrective,
      gotoUserInfoEdit,
      routerBack,
      KedownHandle,
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
