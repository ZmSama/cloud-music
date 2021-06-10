/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-26 16:04:59
 */
export default function throttle2(func: Function, wait = 500) {
  let pre = Date.now();
  console.log(11);

  return function () {
    console.log(222);

    let now = Date.now();
    if (now - pre >= wait) {
      console.log(33);

      func.apply(this, ...arguments);
      pre = Date.now();
    }
  };
}
