/*
 * @Description:全局工具函数
 * @Autor: ZmSama
 * @Date: 2021-06-30 14:02:50
 */

import { IMusicLyric } from '@/typs/models/music';
const GloabTools = () => {
  /**
   * @msg: 将大数据以万取整
   * @param {number} count
   * @return {*}
   */
  const judgePayCount = (count: number) => {
    if (count >= 10000) {
      return Math.round(count / 10000) + '万';
    } else {
      return count;
    }
  };

  /**
   * @msg: 格式化歌词信息  格式均是这样的"[00:00.000] 作词 : 胡如虹"
   * @param {string} text
   * @return {*}
   */
  const formatLyric = (text: string) => {
    if (text) {
      let lyric: IMusicLyric[] = [];
      // 原本字符串已经有\n换行符了
      let arr = text.split('\n');
      let row = arr.length;
      // 逐行处理
      for (let index = 0; index < row; index++) {
        let temp_row = arr[index];
        let temp_arr = temp_row.split(']'); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach(element => {
          // 取出'[]'之间的分秒，再分成数组
          let time_arr = element.substr(1, element.length - 1).split(':');
          let m = parseInt(time_arr[0]) * 60;
          let s = parseInt(time_arr[1]);
          //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          lyric.push({
            time: m + s,
            text: text,
          });
        });
      }
      // 重新排序一下
      lyric.sort(sortRule);
      // 排序函数
      function sortRule(a, b) {
        return a.time - b.time;
      }
      return lyric;
    } else {
      return '暂无歌词';
    }
  };

  /**
   * @msg: 格式化评论时间的
   * @param {number} time
   * @return {*}
   */
  const commentDateFormat = (time: number) => {
    let currentY = new Date().getFullYear();
    let currentM = new Date().getMonth() + 1;
    let currentD = new Date().getDate();
    let target = new Date(time);
    let Y = target.getFullYear();
    let M = target.getMonth() + 1;
    let D = target.getDate();
    let H = target.getHours() > 10 ? target.getHours() : '0' + target.getHours();
    let mm = target.getMinutes() > 10 ? target.getMinutes() : '0' + target.getMinutes();
    if (Y < currentY) {
      return Y + '年' + M + '月' + D + '日' + ' ' + H + ':' + mm;
    } else if (currentM === M) {
      if (currentD === D) {
        return H + ':' + mm;
      } else if (currentD <= D - 1) {
        return '昨天' + ' ' + H + ':' + mm;
      } else {
        return M + '月' + D + '日' + ' ' + H + ':' + mm;
      }
    } else {
      return M + '月' + D + '日' + ' ' + H + ':' + mm;
    }
  };

  /**
   * @msg: 格式化成年月日
   * @param {number} time
   * @return {*}
   */
  const formatDate = (time: number) => {
    let target = new Date(time);
    let Y = target.getFullYear();
    let M = target.getMonth() + 1;
    let D = target.getDate();
    return `${Y}-${M}-${D}`;
  };

  /**
   * @msg: 将一个秒集合格式化成分：秒
   * @param {number} time
   * @return {*}
   */
  const dtJudge = (time: number) => {
    let dt = time / 1000;
    let m = Math.ceil(dt / 60);
    let s = Math.ceil(dt % 60);
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  return {
    judgePayCount,
    formatLyric,
    commentDateFormat,
    formatDate,
    dtJudge,
  };
};

export default GloabTools;
