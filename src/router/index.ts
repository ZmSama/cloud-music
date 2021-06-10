/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-10 16:52:19
 */
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import userRoterList from './model/user';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/views/findMusic/index.vue'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/findMusic',
    name: 'FindMusic',
    component: () => import('@/views/findMusic/index.vue'),
    meta: {
      index: 2,
    },
  },
  ...userRoterList,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
