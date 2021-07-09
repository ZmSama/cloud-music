/*
 * @Description:搜索音乐
 * @Autor: ZmSama
 * @Date: 2021-07-07 09:57:42
 */
import request from '../index';

/**
 * @msg: 调用此接口 , 获取搜索内容
 * @param {*} data
 * @return {*}
 */
export function SEARCH_SONG(params?) {
  return request({
    method: 'GET',
    url: '/cloudsearch',
    params,
  });
}
