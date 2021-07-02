/*
 * @Description:创建loading组件实例
 * @Autor: ZmSama
 * @Date: 2021-07-01 11:47:32
 */
import {
  reactive,
  VNode,
  ref,
  toRefs,
  render,
  h,
  Transition,
  createVNode,
  vShow,
  withDirectives,
  withCtx,
} from 'vue';
import { ILoadingCreateComponentParams, ILoadingInstance } from './types';
import SvgIcon from '@/components/SvgIcon/index.vue';
export function createLoadingComponent({
  options,
  globalLoadingOption,
}: ILoadingCreateComponentParams): ILoadingInstance {
  let vm: VNode = null;
  let afterLeaveTimer: NonNullable<number> = null;
  const afterLeaveFlag = ref(false);
  // 包装一下参数，默认设置不可见
  const data = reactive({
    ...options,
    visible: false,
  });

  // 改变loading文字方法
  function setText(text: string) {
    data.text = text;
  }

  // 销毁自身、移除dom方法
  function destroySelf() {
    // 如果这个loading存在，并且它的父级节点也在，就移除loading
    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  // 关闭方法
  function close() {
    // 如果是全屏的loading，那么先重置
    if (data.fullscreen) {
      globalLoadingOption.fullscreenLoading = undefined;
    }
    // 设置离开后的标识为真，给过渡动画使用的
    afterLeaveFlag.value = true;
    // 清除定时器
    clearTimeout(afterLeaveTimer);
    // 开启定时器，这个定时器默认400毫秒
    afterLeaveTimer = window.setTimeout(() => {
      if (afterLeaveFlag.value) {
        afterLeaveFlag.value = false;
        destroySelf();
      }
    }, 400);
    data.visible = false;
  }

  //   js钩子函数，动画离开时触发
  function handleAfterLeave() {
    if (!afterLeaveFlag.value) return;
    afterLeaveFlag.value = false;
    destroySelf();
  }

  //   组装内容
  const componentSetupConfig = {
    ...toRefs(data),
    setText,
    close,
    handleAfterLeave,
  };

  //  创建loading虚拟dom
  const loadingVNode = {
    name: 'ZmLoading',
    //  将上述组装的参数和方法返回出去，这样外部拿到这个实例就可以使用这些属性和调用这些方法
    setup() {
      return componentSetupConfig;
    },
    render() {
      return h(
        Transition,
        {
          name: 'zm-loading-fade',
          onAfterLeave: this.handleAfterLeave,
        },
        {
          // default的作用可以把插槽传递给子组件、withDirectives的可以让虚拟dom混入自定义指令
          default: withCtx(() => [
            withDirectives(
              createVNode(
                'div',
                {
                  class: 'zm-loading-mask',
                  style: {
                    backgroundColor: this.background || '',
                  },
                },
                [
                  h(
                    'div',
                    {
                      class: 'zm-sppiner-route',
                    },
                    [
                      h(SvgIcon, {
                        name: 'loading',
                        size: '45px',
                      }),
                    ]
                  ),
                  h('span', { class: 'loading-text' }, this.text),
                ]
              ),
              // 给这个生成的组件装入v-show，第二个参数接受一个指令数组，而指令本身就是一个数组，故而两层嵌套，详见文档
              [[vShow, this.visible]]
            ),
          ]),
        }
      );
    },
  };

  vm = createVNode(loadingVNode);
  //   将loading虚拟dom挂载到一个div上
  render(vm, document.createElement('div'));

  return {
    ...componentSetupConfig,
    vm,

    // 对象的get方法，可以方便外部得到应该得到的属性而无需暴露内部属性
    get $el() {
      return vm.el as HTMLElement;
    },
  };
}
