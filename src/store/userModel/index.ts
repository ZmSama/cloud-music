/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-14 15:51:54
 */
import { setItem } from '@/utils/localStorage';
import { Module } from 'vuex';
import { RooteStateType } from '../types';
import { UserInfo, userModelType } from './typs';
import { USER_INFO_KEY } from '@/utils/local-key';
const userModel: Module<userModelType, RooteStateType> = {
  namespaced: true,
  state: {
    info: null,
  },
  mutations: {
    SET_USER_INFO(state, info: UserInfo) {
      state.info = info;
      // 在这里顺便持久化
      setItem(USER_INFO_KEY, info);
    },
    REMOVE_USER_INFO(state) {
      state.info = null;
    },
  },
};

export default userModel;
