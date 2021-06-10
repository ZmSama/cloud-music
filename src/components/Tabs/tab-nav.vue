<!--
 * @Description: tabs的头部组件
 * @Autor: ZmSama
 * @Date: 2021-05-24 11:02:46
-->

<script lang="ts">
import { defineComponent, h, onMounted, inject } from 'vue';
import { RootTabs } from './index.vue';
export default defineComponent({
  name: 'TabNav',
  props: {
    panes: {
      type: Array,
      default: () => [],
    },
    onTabClick: {
      type: Function,
      default: () => {},
    },
  },

  setup(props, ctx) {
    // 从父组件取出提供的参数
    const rootTabs = inject<RootTabs>('rootTabs');

    return {
      rootTabs,
    };
  },

  render() {
    // 来自于父组件的render函数传参过来的panelist
    const { panes, onTabClick, rootTabs } = this;

    // 循环调用h函数处理成模板的形式，并根据当前的名字判断是否处于激活状态
    let pan = panes.map(item => {
      return h(
        'div',
        {
          class: {
            'tab-nav-item': true,
            'is-active': item.props.label == rootTabs.currentName.value,
          },
          onClick: () => {
            onTabClick(item.props.label);
          },
        },
        item.props.label
      );
    });

    // 渲染到页面上
    return h('div', { class: 'tab-nav' }, pan);
  },
});
</script>
<style lang="scss" scoped></style>
