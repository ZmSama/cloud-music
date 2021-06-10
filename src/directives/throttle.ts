/*
 * @Description:函数节流指令
 * @Autor: ZmSama
 * @Date: 2021-05-25 16:07:57
 */
import throttleFunc from '../utils/throttle';
const throttle = {
  beforeMount(el, binding) {
    const [func, timer] = binding.value;
    el.addEventListener('click', throttleFunc(func, timer));
  },
};

export default throttle;
