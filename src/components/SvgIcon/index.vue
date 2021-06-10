<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-10 15:42:43
-->
<template>
  <div
    :style="{
      display: 'inline-flex',
      height: iconSize,
      width: iconSize,
    }"
    class="icon-default"
  >
    <svg :style="{ fill: color }">
      <use :xlink:href="`#icon-${name}`"></use>
    </svg>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
      default: '10',
    },
  },
  setup(props) {
    const { name, color, size } = props;

    const iconSize = computed(() => {
      if (size.indexOf('px') !== -1) {
        return size;
      } else {
        return size + 'px';
      }
    });
    return {
      name,
      color,
      iconSize,
    };
  },
});
</script>
<style lang="scss" scoped>
.icon-default {
  opacity: 0.8;
  // &:hover {
  //   opacity: 1;
  // }
  // cursor: pointer;
}
</style>
