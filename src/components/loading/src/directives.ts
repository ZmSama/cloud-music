/*
 * @Description: 混入指令
 * @Autor: ZmSama
 * @Date: 2021-07-01 16:05:34
 */

import Loading from './index';

const createInstance = (el, binding) => {
  const vm = binding.instance;
  const textExr = el.getAttribute('zm-loading-text');
  const backgroundExr = el.getAttribute('zm-loading-background');
  // 把loading实例挂载到el的instance上
  el.instance = Loading({
    text: (vm && vm[textExr]) || textExr,
    background: (vm && vm[backgroundExr]) || backgroundExr,
    fullscreen: !!binding.modifiers.fullscreen,
    target: !!binding.modifiers.fullscreen ? null : el,
    body: !!binding.modifiers.body,
    visible: true,
    lock: !!binding.modifiers.lock,
  });
};

const vLoading = {
  mounted(el, binding) {
    // 指令的绑定值有值才调用
    if (!!binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el.instance;
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        createInstance(el, binding);
      } else {
        instance.close();
      }
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export default vLoading;
