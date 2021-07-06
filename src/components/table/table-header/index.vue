<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-05 09:42:40
-->
<script lang="ts">
import { defineComponent, h, inject } from 'vue';
import { hColgroup } from '../utils/index';
export default defineComponent({
  name: 'TableHeader',
  setup() {
    const children = inject('children');
    return {
      children,
    };
  },
  render() {
    const { children } = this;
    const columns = children.map(item => {
      return {
        ...item.props,
        id: item.key,
      };
    });
    // 得到需要的数组
    return h(
      'table',
      {
        cellpadding: '0',
        cellspacing: '0',
        border: '1',
        width: '100%',
        class: 'el-table__header',
      },
      [
        hColgroup(columns),
        h('thead', {}, [
          h('tr', {}, [
            ...columns.map(item => {
              return h('th', {}, item.label);
            }),
          ]),
        ]),
      ]
    );
  },
});
</script>
<style lang="scss" scoped></style>
