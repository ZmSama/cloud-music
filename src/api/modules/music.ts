/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-08 17:42:35
 */
import request from '../index';

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
/**
 * @msg: 调用此接口 , 根据id获得歌曲评论
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_COMMENT(params?) {
  return request({
    method: 'GET',
    url: '/comment/music',
    params,
  });
}
/**
 * @msg: 调用此接口 , 根据id获得相似歌曲
 * @param {*} data
 * @return {*}
 */
export function GET_SIMI_SONG(params?) {
  return request({
    method: 'GET',
    url: '/simi/song',
    params,
  });
}
