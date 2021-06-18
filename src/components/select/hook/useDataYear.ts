/*
 * @Description:生成特定的年份范围
 * @Autor: ZmSama
 * @Date: 2021-06-18 11:51:04
 */
import { slectOptType } from '../types';
export default function useDataYear(): slectOptType[] {
  // 得到今年的年份
  let curYear = new Date().getFullYear();
  // 得到间隔，间隔是100年,用这个为起点循环生成一个年份数组
  let space = curYear - 100;
  let result = [];
  for (let index = space; index <= curYear; index++) {
    result.push({
      label: `${index}年`,
      value: index,
    });
  }
  return result;
}
