<!--
 * @Description: 按钮组更多的是提供一个集合容器
 * @Autor: ZmSama
 * @Date: 2021-06-15 15:24:53
-->
<template>
  <div class="zm-radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs, nextTick } from 'vue';
export const UPDATE_MODEL_EVENT = 'update:modelValue';
export default defineComponent({
  name: 'ZmRadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
  },

  setup(props, ctx) {
    // methods
    const changeEvent = value => {
      ctx.emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => {
        ctx.emit('change', value);
      });
    };
    provide(
      'ZmRadioGroup',
      reactive({
        name: 'ZmRadioGroup',
        ...toRefs(props),
        changeEvent,
      })
    );
  },
});
</script>
<style lang="scss" scoped></style>
