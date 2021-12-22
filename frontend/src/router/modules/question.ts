import type { AppRouteRecordRaw } from '@/router/types';
import Layout from '@/views/layouts/Index.vue';

const questionRoutes: AppRouteRecordRaw[] = [
  {
    path: '/question',
    name: 'Question',
    component: Layout,
    meta: { title: '问题列表', icon: 'el-icon-menu' },
    redirect: '/question/list',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/question/Index.vue'),
        meta: { title: '问题列表' },
      },
    ],
  },
];

export default questionRoutes;
