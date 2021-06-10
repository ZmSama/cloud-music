<!--
 * @Description: 封装手风琴动画
 * @Autor: ZmSama
 * @Date: 2021-05-19 10:28:08
-->
<template>
  <transition v-on="on">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { addClass, removeClass } from "@/utils/dom"
export default defineComponent({
  name: "CollapseTransition",
  setup() {
    return {
      on: {
        beforeEnter(el: HTMLElement) {
          // 节点渲染时添加一个过渡高度的类
          addClass(el, "collapse-transition")
          // 保留上下内边距
          el.dataset.oldPaddingTop = el.style.paddingTop as string | undefined
          el.dataset.oldPaddingBottom = el.style.paddingBottom as string | undefined
          // 初始化高度和边距为0
          el.style.height = "0"
          el.style.paddingTop = "0"
          el.style.paddingBottom = "0"
        },
        enter(el: HTMLElement) {
          //  保留当前元素的overflow
          el.dataset.oldOverflow = el.style.overflow as string
          // 如果当前原的高度不为0那么节点进入之后就将他的高度和边距设置回去
          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + "px"
            el.style.paddingTop = el.dataset.oldPaddingTop as string | null
            el.style.paddingBottom = el.dataset.oldPaddingBottom as string | null
          } else {
            el.style.height = ""
            el.style.paddingTop = el.dataset.oldPaddingTop as string | null
            el.style.paddingBottom = el.dataset.oldPaddingBottom as string | null
          }
          // 如果不加这个隐藏会导致里面的子元素直接全部显示出来，达不到每个子元素渐渐展开的效果
          el.style.overflow = "hidden"
        },
        afterEnter(el: HTMLElement) {
          // 节点完全进入后移除这个过渡样式
          removeClass(el, "collapse-transition")
          // 将外层的style高度去掉，让里面的子项目高度撑开
          el.style.height = ""
          // 重置该元素的overflow属性
          el.style.overflow = el.dataset.oldOverflow as string | null
          el.style.paddingTop = el.dataset.oldPaddingTop as string | null
          el.style.paddingBottom = el.dataset.oldPaddingBottom as string | null
        },
        beforeLeave(el: HTMLElement) {
          // 保留高度、边距和overflow
          el.dataset.oldPaddingTop = el.style.paddingTop as string | undefined
          el.dataset.oldPaddingBottom = el.style.paddingBottom as string | undefined
          el.dataset.oldOverflow = el.style.overflow as string | undefined

          el.style.height = el.scrollHeight + "px"
          //   如果不添加隐藏属性，那么外层高度消失时子元素还在
          el.style.overflow = "hidden"
        },
        leave(el: HTMLElement) {
          if (el.scrollHeight !== 0) {
            //  添加高度过渡类
            addClass(el, "collapse-transition")
            // 设置高度和边距为0
            el.style.height = "0"
            el.style.paddingTop = "0"
            el.style.paddingBottom = "0"
          }
        },
        afterLeave(el: HTMLElement) {
          // 移除类
          removeClass(el, "collapse-transition")
          el.style.height = ""
          el.style.overflow = el.dataset.oldOverflow as string | null
          el.style.paddingTop = el.dataset.oldPaddingTop as string | null
          el.style.paddingBottom = el.dataset.oldPaddingBottom as string | null
        },
      },
    }
  },
})
</script>
