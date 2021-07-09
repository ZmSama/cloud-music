import { IMusicParams } from '@/typs/models/music';

/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-09 11:47:29
 */
export interface playModelType {
  play: boolean;
  musicSource: IMusicParams;
  audioRef: HTMLAudioElement;
  currentTime: number;
}
