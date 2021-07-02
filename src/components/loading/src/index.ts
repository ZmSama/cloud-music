/*
 * @Description:loaidng组件
 * @Autor: ZmSama
 * @Date: 2021-06-30 16:41:12
 */
import { nextTick } from 'vue';
import { ILoadingOptions, ILoadingGlobalConfig } from './types';
import { createLoadingComponent } from './createLoadingComponent';
import { addClass, removeClass } from '@/utils/dom';

// 初始化参数
const defaults: ILoadingOptions = {
  parent: null,
  background: '',
  spinner: false,
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: '',
};

// 全屏loading参数初始化
const globalLoadingOption: ILoadingGlobalConfig = {
  fullscreenLoading: null,
};
export default function Loading(options: ILoadingOptions = {}) {
  // 载入用户如传入的参数
  options = {
    ...defaults,
    ...options,
  };

  // 获取loading要覆盖的节点
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target) as HTMLElement;
  }
  // 如果用户没有指定覆盖点，那就默认插入到body上
  options.target = options.target || document.body;
  // 如果插入点不是body，那么全屏属性必为假
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    // 说如插入的位置是body，记录起来
    options.body = true;
  }

  // 将loading父级节点记录起来
  const parent = options.body ? document.body : options.target;
  options.parent = parent;

  // 当全屏的loading存在时，先关闭，防止出现bug
  if (options.fullscreen && globalLoadingOption.fullscreenLoading) {
    // 调用实例方法关闭
    globalLoadingOption.fullscreenLoading.close();
  }

  // 根据参数创建loading实例
  const instance = createLoadingComponent({ options, globalLoadingOption });
  // 判断实例的position情况，因为loading如果要覆盖特定区域，是要求该区域是relative的，我这里贪方便直接添加了
  addClass(parent, 'zm-loading-parent--relative');

  // 将loading实例渲染到父级节点上
  parent.appendChild(instance.$el);

  // 当loading挂载到dom时就去触发动画
  nextTick().then(() => {
    instance.visible.value = Object.prototype.hasOwnProperty.call(options, 'visible')
      ? options.visible
      : true;
  });

  return instance;
}
