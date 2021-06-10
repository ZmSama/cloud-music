<!--
 * @Description: tabs页
 * @Autor: ZmSama
 * @Date: 2021-05-21 15:27:58
-->

<script lang="ts">
import {
  defineComponent,
  ref,
  h,
  onMounted,
  getCurrentInstance,
  VNode,
  ComputedRef,
  provide,
  Ref,
} from 'vue';
import TabNav from './tab-nav.vue';

export interface ITabsProps {
  currentName: string;
  activeName: string;
  modelValue: string;
}

export interface Pane {
  paneName: ComputedRef<string>;
  active: ComputedRef<boolean>;
}

export interface RootTabs {
  props: ITabsProps;
  currentName: Ref<string>;
}

export default defineComponent({
  name: 'Tabs',
  components: {
    TabNav,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    activeName: {
      type: String,
      default: '',
    },
    currentName: {
      type: String,
      default: '',
    },
  },
  setup(props: ITabsProps, ctx) {
    const instance = getCurrentInstance();
    const currentName = ref(props.modelValue || props.activeName || '0');
    const panes = ref<VNode[]>([]); //定义这个数组用来接收tab-pane里面的所有内容的

    onMounted(() => {
      // 从所有的子树中取出内容的部分
      const children = instance.subTree.children;
      const paneList = Array.from(children as ArrayLike<VNode>).find(
        item => item.props.class === 'tab-content'
      );

      // 默认将内容的第一项赋值当前激活的项
      if (paneList) {
        currentName.value = paneList.children[0].props.label;
      }
      // console.log(paneList);
      panes.value = paneList.children as VNode[];
    });

    // tab-nav点击的回调函数
    const handleTabClick = val => {
      currentName.value = val;
    };

    // 将参数提供给子组件
    provide<RootTabs>('rootTabs', {
      props,
      currentName,
    });

    return {
      handleTabClick,
      currentName,
      panes,
    };
  },

  render() {
    const { panes, handleTabClick } = this;

    // 头部内容
    const header = h(
      'div',
      {
        class: ['tab-header'],
      },
      [
        h(TabNav, {
          panes,
          onTabClick: handleTabClick,
        }),
      ]
    );

    // 内容区域
    const panels = h(
      'div',
      {
        class: ['tab-content'],
      },
      this.$slots?.default()
    );
    // 组合内容

    return h(
      'div',
      {
        class: 'tabs-wrap',
      },
      [header, panels]
    );
  },
});
</script>
<style lang="scss" scoped></style>
