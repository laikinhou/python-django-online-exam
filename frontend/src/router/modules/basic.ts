import type { AppRouteRecordRaw } from '@/router/types';
import Layout from '@/views/layouts/Index.vue';

const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/Login.vue'),
    meta: { ignoreAuth: true, hideMenu: true, title: '登录' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/common/Register.vue'),
    meta: { ignoreAuth: true, hideMenu: true, title: '注册' },
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    meta: { title: '首页', ignoreAuth: true, hideMenu: true },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', ignoreAuth: true, hideMenu: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('@/views/exception/404.vue'),
    meta: { title: '错误页面', hideMenu: true },
  },
];

export default basicRoutes;
