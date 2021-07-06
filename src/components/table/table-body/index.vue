<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-07-05 09:48:31
-->
<script lang="ts">
import { defineComponent, inject, h } from 'vue';
import { hColgroup } from '../utils';

export default defineComponent({
  name: 'TableBody',
  emits: ['curRow', 'click'],
  setup(props, { emit }) {
    const children = inject('children');
    const data = inject('data');
    const tdClickHandler = row => {
      emit('click', row);
    };
    const renderLayout = (children: any[], data: any[]) => {
      let arr = [];
      data.forEach(row => {
        arr.push(
          h('tr', [
            children.map(col => {
              if (col.children) {
                return h('td', {}, [
                  ...col.children
                    .default()
                    .map(item => h(item, { onClick: () => tdClickHandler(row) })),
                ]);
              } else {
                return h('td', {}, row[col.props.prop]);
              }
            }),
          ])
        );
      });
      return arr;
    };
    return {
      children,
      data,
      tdClickHandler,
      renderLayout,
    };
  },

  render() {
    const { children, data, tdClickHandler, renderLayout } = this;
    const columns = children.map(item => {
      return {
        ...item.props,
        id: item.key,
      };
    });
    return h(
      'table',
      {
        class: 'zm-table__body',
        cellspacing: '0',
        cellpadding: '0',
        border: '1',
        width: '100%',
      },
      [hColgroup(columns), h('tbody', {}, [...renderLayout(children, data)])]
    );
  },
});
</script>
<style lang="scss" scoped></style>
