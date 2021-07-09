/*
 * @Description:音乐相关类型文件
 * @Autor: ZmSama
 * @Date: 2021-07-07 14:36:58
 */

/**
 * @msg: 音乐的基本类型
 * @param {*}
 * @return {*}
 */
export type IMusicParams = {
  id: number;
  url: string;
  size: number;
  type: string;
  al?: string;
  art?: string;
  songName: string;
  pic: string;
  dt: number;
  lyric?: Array<IMusicLyric>;
};

/**
 * @msg: 歌词属性
 * @param {*}
 * @return {*}
 */
export type IMusicLyric = {
  time?: number;
  text?: string;
};
