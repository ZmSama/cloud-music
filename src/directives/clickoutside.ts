/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-12 11:55:41
 */
const clickoutside = {
  mounted(el: any, binding: any) {
    const clickHandler = (e: any) => {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.value) {
        binding.value(e)
      }
    }
    el.__vueclickoutside__ = clickHandler
    document.addEventListener("click", clickHandler)
  },
  unmounted(el: any) {
    document.removeEventListener("click", el.__vueclickoutside__)
    delete el.__vueclickoutside__
  },
}
export default clickoutside
