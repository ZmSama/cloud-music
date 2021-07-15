/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-14 15:51:54
 */
import { Module } from 'vuex';
import { RooteStateType } from '../types';
import { userModelType } from './typs';
const userModel: Module<userModelType, RooteStateType> = {
  namespaced: true,
  state: {
    info: null,
  },
  mutations: {},
};

export default userModel;
