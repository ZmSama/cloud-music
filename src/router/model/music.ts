/*
 * @Description:音乐相关路由
 * @Autor: ZmSama
 * @Date: 2021-07-02 10:26:20
 */
import { RouteRecordRaw } from 'vue-router';
const musicRoterList: RouteRecordRaw[] = [
  {
    path: '/music-search-details',
    name: 'MusicSearchDetails',
    component: () => import('@/views/searchDetails/index.vue'),
    meta: {
      index: 3,
    },
  },
  {
    path: '/song-details-list',
    name: 'SongDetailsList',
    component: () => import('@/views/songDetailsList/index.vue'),
    meta: {
      index: 3,
    },
  },
];

export default musicRoterList;
