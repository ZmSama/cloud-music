/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-09 10:46:13
 */
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { RooteStateType } from './types';
import playModel from './playModel/index';

// 定义 injection key
export const key: InjectionKey<Store<RooteStateType>> = Symbol();

export const store = createStore<RooteStateType>({
  modules: {
    playModel,
  },
});

// 定义自己的 `useStore` 组合式函数
export function useStore<T = RooteStateType>() {
  return baseUseStore<T>(key);
}
