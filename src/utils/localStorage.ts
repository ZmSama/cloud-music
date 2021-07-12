/*
 * @Description:封装本地存储
 * @Autor: ZmSama
 * @Date: 2021-07-10 09:43:24
 */

/**
 * @msg: 存储
 * @param {string} key
 * @param {any} value
 * @return {*}
 */
function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @msg: 取值
 * @param {string} key
 * @return {*}
 */
function getItem(key: string) {
  return new Promise(resolve => {
    let res = localStorage.getItem(key);
    resolve(JSON.parse(res));
  });
}

/**
 * @msg: 移除
 * @param {string} key
 * @return {*}
 */
function removeItem(key: string) {
  localStorage.removeItem(key);
}

export { setItem, getItem, removeItem };
