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
/**
 * @msg: 调用此接口 , 得到热搜列表
 * @param {*} data
 * @return {*}
 */
export function GET_HOT_SEARCH_LIST(params?) {
  return request({
    method: 'GET',
    url: '/search/hot/detail',
    params,
  });
}
/**
 * @msg: 调用此接口 , 得到歌单分类
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_LIST_TYPE(params?) {
  return request({
    method: 'GET',
    url: '/playlist/catlist',
    params,
  });
}
/**
 * @msg: 调用此接口 , 得到歌单分类(精品系列)
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_LIST_TYPE_HIGHT_QUALITY(params?) {
  return request({
    method: 'GET',
    url: '/playlist/highquality/tags',
    params,
  });
}
/**
 * @msg: 调用此接口 , 得到歌单列表
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_LIST(params?) {
  return request({
    method: 'GET',
    url: '/top/playlist',
    params,
  });
}
/**
 * @msg: 调用此接口 , 得到歌单列表(精品)
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_LIST_HEIGHT_QUALITY(params?) {
  return request({
    method: 'GET',
    url: '/top/playlist/highquality',
    params,
  });
}
/**
 * @msg: 调用此接口 , 得到歌单详情
 * @param {*} data
 * @return {*}
 */
export function GET_SONG_LIST_DETAILS(params?) {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    params,
  });
}
