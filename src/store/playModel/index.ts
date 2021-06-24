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
    play: false,
  },
  mutations: {
    TOOGLE_PLAY_STATU(state) {
      state.play = !state.play;
    },
  },
};

export default playModel;
