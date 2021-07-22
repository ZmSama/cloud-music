/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-22 10:42:47
 */
import { useStore } from '@/store/index';
import { useRouter } from 'vue-router';
import { reactive, toRefs, watch, onMounted, onUnmounted } from 'vue';
import {
  GET_QR_KEY,
  CREATE_QR_CODE_BY_KEY,
  LOOP_CHECK_QRCODE,
  GET_LOGIN_STATUS,
  USER_LOGIN_BY_PHONE,
} from '@/api/modules/user';
import { getItem } from '@/utils/localStorage';
import { USER_INFO_KEY } from '@/utils/local-key';
import { Md5 } from 'ts-md5/dist/md5';
export default function useLogin(ref: any) {
  // 从vuex获取用户信息
  const store = useStore();
  const router = useRouter();
  const { info } = toRefs(store.state.userModel);

  const state = reactive({
    isOpenUserinfo: false, //是否打开用户信息框
    isOpenLogin: false, //是否打开登陆信息框
    qrcode: '', //二维码
    key: '', //生成二维码的key
    isQrCodeType: true, //二维码登录
    isRegister: false, //注册模式
    isTimeout: false, //二维码超时
    timer: null, //记录二维码超时的定时器
  });

  const loginFrom = reactive({
    phone: '',
    password: '',
  });

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

  // 改变登陆方式
  const changeLoginType = () => {
    state.isQrCodeType = false;
    // 此时要停止定时器行为
    stopTimer();
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
    // 此时继续开启定时器轮询
    startTimer();
  };

  // 手机号登陆按钮
  const loginOrRegist = () => {
    ref.value.validate(async valid => {
      if (valid) {
        let res = await USER_LOGIN_BY_PHONE({
          phone: loginFrom.phone,
          md5_password: Md5.hashStr(loginFrom.password),
        });
        if (res.data) {
          if (res.data) console.log(res.data);
        }
      } else {
        return false;
      }
    });
  };

  // 监听二维码，轮询一个校验二维码状态的接口
  watch(
    () => state.qrcode,
    () => {
      startTimer();
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

  //   关闭定时器。停止轮询
  const stopTimer = () => {
    clearInterval(state.timer);
    state.timer = null;
  };

  //   开启定时器轮询二维码状态
  const startTimer = () => {
    state.timer = setInterval(() => {
      loopCheckKye(state.key);
    }, 1000);
  };

  onUnmounted(() => {
    stopTimer();
  });

  return {
    ...toRefs(state),
    info,
    toUserInfo,
    handleCloseDrective,
    gotoUserInfoEdit,
    loginBoxClose,
    toggleRegister,
    toggleLogin,
    toggleQrLogin,
    changeLoginType,
    loginOrRegist,
    loginFrom,
  };
}
