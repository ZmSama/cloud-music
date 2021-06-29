/*
 * @Description:基础api接口
 * @Autor: ZmSama
 * @Date: 2021-06-28 11:24:22
 */

import request from '../index';

/**
 * @msg: 调用此接口 , 可获取APP首页信息
 * @param {*} data
 * @return {*}
 */
export function HOMEPAGE_BLOCK_PAGE(data?) {
  return request({
    method: 'POST',
    url: '/homepage/block/page',
    data,
  });
}

/**
 * @msg: 获得国家列表
 * @param {*} data
 * @return {*}
 */
export function GET_COUNTIRES_LIST(data?) {
  return request({
    method: 'POST',
    url: '/countries/code/list',
    data,
  });
}
