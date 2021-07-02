/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-01 11:19:07
 */
import { Ref, VNode } from 'vue';
// 规定loading的父级元素是HTML，另实现一个添加类的方法
export interface ILoadingParentElement extends HTMLElement {
  vLoadingAddClassList?: () => void;
}
// 传入loading参数限制
export type ILoadingOptions = {
  parent?: ILoadingParentElement;
  background?: string;
  spinner?: boolean | string;
  text?: string;
  fullscreen?: boolean;
  body?: boolean;
  lock?: boolean;
  customClass?: string;
  visible?: boolean;
  target?: string | HTMLElement;
};

// loading实例的类型
export type ILoadingInstance = {
  parent?: Ref<ILoadingParentElement>;
  background?: Ref<string>;
  spinner?: Ref<boolean | string>;
  text?: Ref<string>;
  fullscreen?: Ref<boolean>;
  body?: Ref<boolean>;
  lock?: Ref<boolean>;
  customClass?: Ref<string>;
  visible?: Ref<boolean>;
  target?: Ref<string | HTMLElement>;
  originalPosition?: Ref<string>;
  originalOverflow?: Ref<string>;
  setText: (text: string) => void;
  close: () => void;
  handleAfterLeave: () => void;
  vm: VNode;
  $el: HTMLElement;
};

// 全局loading参数，记录一个全屏loading实例，他持有和loading实例一样的参数
export type ILoadingGlobalConfig = {
  fullscreenLoading: ILoadingInstance;
};

// 联合声明，比分开定义类型更简洁
export type ILoadingCreateComponentParams = {
  options: ILoadingOptions;
  globalLoadingOption: ILoadingGlobalConfig;
};
