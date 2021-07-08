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
/**
 * @msg: 调用此接口 , 根据id获得音乐
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_BY_ID(params?) {
  return request({
    method: 'GET',
    url: '/song/url',
    params,
  });
}
/**
 * @msg: 调用此接口 , 根据id获得音乐的封面
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_PIC(params?) {
  return request({
    method: 'GET',
    url: '/song/detail',
    params,
  });
}
/**
 * @msg: 调用此接口 , 根据id获得歌词
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_WORD(params?) {
  return request({
    method: 'GET',
    url: '/lyric',
    params,
  });
}
