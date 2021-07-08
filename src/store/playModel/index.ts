/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-09 11:02:18
 */
import { Module } from 'vuex';
import { RooteStateType } from '../types';
import { playModelType } from './type';
import { IMusicParams } from '@/typs/models/music';
const playModel: Module<playModelType, RooteStateType> = {
  namespaced: true,
  state: {
    play: false,
    musicSource: null,
    audioRef: null,
  },
  mutations: {
    // 设置播放器实例
    SET_AUDIO_INSTANCE(state, ref) {
      state.audioRef = ref;
    },
    // 设置播放源
    SET_MUSIC_SOURCE(state, data: IMusicParams) {
      state.musicSource = data;
    },
    // 重置状态
    RESET_MUSIC_STATE(state) {
      state.musicSource = null;
    },
    // 播放
    PLAY_MUSIC(state) {
      state.play = true;
      state.audioRef.play();
    },
    // 暂停
    PAUSE_MUSIC(state) {
      state.play = false;
      state.audioRef.pause();
    },
    // 切换状态
    TOGGLE_PLAY_PAUSE(state) {
      state.play = !state.play;
    },
  },
};

export default playModel;
