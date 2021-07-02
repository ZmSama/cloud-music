/*
 * @Description:全局工具函数
 * @Autor: ZmSama
 * @Date: 2021-06-30 14:02:50
 */

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

  return {
    judgePayCount,
  };
};

export default GloabTools;
