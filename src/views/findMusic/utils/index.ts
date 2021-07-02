/*
 * @Description:局部工具
 * @Autor: ZmSama
 * @Date: 2021-06-30 14:05:16
 */

import { IArtists } from '../types';
export default function Tools() {
  /**
   * @msg: 处理作者名字
   * @param {Array} arr
   * @return {*}
   */
  const judgeArist = (arr: Array<IArtists>) => {
    if (arr.length > 1) {
      return arr.map(item => item.name).join('/');
    } else {
      return arr[0].name;
    }
  };

  /**
   * @msg: 得到当天日期
   * @param {*}
   * @return {*}
   */
  const judgeTodayNum = () => {
    let day = new Date().getDate();
    return day > 10 ? day : '0' + day;
  };

  return {
    judgeArist,
    judgeTodayNum,
  };
}
