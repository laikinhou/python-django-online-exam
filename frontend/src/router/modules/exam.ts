import type { AppRouteRecordRaw } from '@/router/types';
import Layout from '@/views/layouts/Index.vue';

const examRoutes: AppRouteRecordRaw[] = [
  {
    path: '/examList',
    name: 'ExamList',
    component: Layout,
    meta: { title: '考试列表', icon: 'el-icon-menu' },
    redirect: '/examList/list',
    children: [
      {
        path: '/examList/list',
        name: 'List',
        component: () => import('@/views/exam/Index.vue'),
        meta: { title: '考试列表' },
      },
    ],
  },
  {
    path: '/examDetail',
    name: 'ExamDetail',
    component: Layout,
    meta: { title: '考试管理', icon: 'el-icon-menu' },
    redirect: '/examDetail/detail',
    children: [
      {
        path: '/examDetail/detail',
        name: 'Detail',
        component: () => import('@/views/exam/Manager.vue'),
        meta: { title: '考试管理' },
      },
    ],
  },
];

export default examRoutes;
