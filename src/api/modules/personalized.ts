/*
 * @Description:独家放送相关接口
 * @Autor: ZmSama
 * @Date: 2021-06-30 10:08:18
 */
import request from '../index';

/**
 * @msg: 调用此接口 , 可获取独家放送
 * @param {*} data
 * @return {*}
 */
export function PERSONALIZED_PRIVATECONTENT(data?) {
  return request({
    method: 'POST',
    url: '/personalized/privatecontent',
    data,
  });
}
