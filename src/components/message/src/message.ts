/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-03 10:34:51
 */
import { createVNode, render, VNode } from 'vue';
import MessageConstructor from './index.vue';
import { IMassgeOptions } from './types';

// 定义一个数组收集每次产生的弹框
const MessageQueue: VNode[] = [];

export default function Message(option: IMassgeOptions) {
  // 判断传入的参数是字符串还是对象
  if (typeof option == 'string') {
    option = {
      message: option,
    };
  }

  // 计算偏移值,每次都从MessageQueue这里循环查找
  let offset = option.offset || 50;

  MessageQueue.forEach((vm: VNode) => {
    offset += vm.el.offsetHeight + 16;
  });

  // 函数劫持，实现关闭后移除dom元素
  let customerClose = option.onClose;
  let opts = {
    ...option,
    offset,
    onClose: () => {
      console.log('移除dom');
      MessageQueue.splice(0, MessageQueue.length);
      // 如果外部传入这个关闭方法就调用，否则忽略，es10的链式判断
      customerClose?.();
    },
  };

  // 创建一个节点
  const container = document.createElement('div');

  // 把组件变成虚拟节点
  const vm = createVNode(MessageConstructor, opts);
  console.log(vm.el);

  // 将组件渲染到页面上
  render(vm, container);
  // 把每次弹出的实例收集起来做偏移值计算
  MessageQueue.push(vm);

  // 移除dom节点，新版vue3，render渲染null时节点将被移除
  // vm就是实例（this）
  vm.props.onDestroy = () => {
    render(null, container);
  };
  // 将这个节点追加到body下
  document.body.appendChild(container.firstElementChild);
}
