/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-15 16:06:45
 */
import request from '../index';

/**
 * @msg: 调用此接口 , 得到一个生成登陆二维码的key
 * @param {*} data
 * @return {*}
 */
export function GET_QR_KEY(params?) {
  return request({
    method: 'GET',
    url: '/login/qr/key',
    params,
  });
}
/**
 * @msg: 调用此接口 , 用一个key生成二维码,传入qrimg=“true”会得到base64二维码
 * @param {*} data
 * @return {*}
 */
export function CREATE_QR_CODE_BY_KEY(params?) {
  return request({
    method: 'GET',
    url: '/login/qr/create',
    params,
  });
}
/**
 * @msg: 调用此接口 , 用一个key生成二维码,传入qrimg=“true”会得到base64二维码
 * @param {*} data
 * @return {*}
 */
export function LOOP_CHECK_QRCODE(params?) {
  return request({
    method: 'GET',
    url: '/login/qr/check',
    params,
  });
}
/**
 * @msg: 调用此接口 , 检查登陆状态(必须有cookie，否则返回空内容)
 * @param {*} data
 * @return {*}
 */
export function GET_LOGIN_STATUS(params?) {
  return request({
    method: 'GET',
    url: '/login/status',
    params,
  });
}
/**
 * @msg: 调用此接口 , 获得用户歌单、收藏、mv、dj数量(必须有cookie，否则返回空内容)
 * @param {*} data
 * @return {*}
 */
export function GET_USER_INFO(params?) {
  return request({
    method: 'GET',
    url: '/user/subcount',
    params,
  });
}
/**
 * @msg: 调用此接口 , 获得用户歌单信息(必须有cookie，否则返回空内容)
 * @param {*} data
 * @return {*}
 */
export function GET_USER_SONG_LIST(params?) {
  return request({
    method: 'GET',
    url: '/user/playlist',
    params,
  });
}
