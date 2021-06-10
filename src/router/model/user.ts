/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-09 15:56:12
 */
import { RouteRecordRaw } from 'vue-router';
const userRoterList: RouteRecordRaw[] = [
  {
    path: '/user-info-edit',
    name: 'UsreInfoEdit',
    component: () => import('@/views/user/components/UserInfoEdit.vue'),
    meta: {
      index: 3,
    },
  },
];

export default userRoterList;
