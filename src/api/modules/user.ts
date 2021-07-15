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
