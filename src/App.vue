<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-10 10:11:28
-->
<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Home from "@/views/home/Home.vue"
export default defineComponent({
  name: "App",
  components: {
    Home,
  },
  setup() {},
})
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
