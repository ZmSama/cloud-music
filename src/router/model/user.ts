/*
 * @Description:用户相关路由
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
      index: 4,
    },
  },
];

export default userRoterList;
