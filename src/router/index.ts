/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-10 16:52:19
 */
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import userRoterList from './model/user';
import musicRoterList from './model/music';
import Personalized from '@/views/findMusic/components/personalized/Personalized.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/views/findMusic/index.vue'),
    meta: {
      index: 1,
    },
    redirect: '/findMusic/personalized',
  },
  {
    path: '/findMusic',
    name: 'FindMusic',
    component: () => import('@/views/findMusic/index.vue'),
    children: [
      {
        path: 'personalized',
        name: 'Personalized',
        components: {
          default: Personalized,
          personalized: Personalized,
        },
      },
      {
        path: 'songList',
        name: 'SongList',
        component: () => import('@/views/findMusic/components/songList/index.vue'),
        meta: {
          index: 3,
        },
      },
      {
        path: 'heightQuality',
        name: 'HeightQuality',
        component: () =>
          import('@/views/findMusic/components/songList/components/heightQuality.vue'),
        meta: {
          index: 3,
        },
      },
    ],
    meta: {
      index: 2,
    },
  },
  ...userRoterList,
  ...musicRoterList,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
