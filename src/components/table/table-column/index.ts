/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-05 09:49:29
 */
import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'ZmTableColumn',
  props: {
    prop: {
      type: String,
    },
    label: {
      type: String,
    },
    width: {
      type: String,
    },
  },

  render() {
    if (this.$slots.default) {
      return h('div', {}, this.$slots.default());
    } else {
      return h('div');
    }
  },
});
