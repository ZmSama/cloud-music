/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-09 11:02:18
 */
import { Module } from 'vuex';
import { RooteStateType } from '../types';
import { playModelType } from './type';

const playModel: Module<playModelType, RooteStateType> = {
  namespaced: true,
  state: {
    count: 1,
  },
  getters: {
    doubleCount: state => state.count * 2,
  },
  mutations: {
    ADD_COUNT(state) {
      state.count += 1;
    },
  },
};

export default playModel;
