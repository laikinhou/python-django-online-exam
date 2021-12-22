import type { AppRouteRecordRaw } from '@/router/types';
import Layout from '@/views/layouts/Index.vue';

const examRoutes: AppRouteRecordRaw[] = [
  {
    path: '/examList',
    name: 'ExamList',
    component: Layout,
    meta: { title: '考试卡片', icon: 'el-icon-menu' },
    redirect: '/examList/view',
    children: [
      {
        path: 'view',
        name: 'View',
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
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/exam/Manager.vue'),
        meta: { title: '管理列表' },
      },
    ],
  },
  {
    path: '/userExam',
    name: 'Exam',
    component: Layout,
    meta: { title: '我的考试', icon: 'el-icon-menu' },
    redirect: '/examDetail/detail',
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/exam/Manager.vue'),
        meta: { title: '我的考试' },
      },
    ],
  },
];

export default examRoutes;
