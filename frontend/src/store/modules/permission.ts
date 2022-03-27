import { defineStore } from 'pinia';
import { store } from '../index';
import type { AppRouteRecordRaw } from '@/router/types';
import { PermissionInfo, RouteInfo } from '../types';

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionInfo => ({ routes: [] }),
  getters: {
    menus(): RouteInfo[] {
      return this.routes;
    },
  },
  actions: {
    setRoutes(routes: AppRouteRecordRaw[]): void {
      this.routes = [];
      const self = this;
      routes.forEach((route) => {
        const item = self.parseRoute(route);
        if (item) {
          self.routes.push(item);
        }
      });

      // 路由按照 rank 配置排序
      self.routes.sort((a, b) => {
        if (a.rank && b.rank) {
          return a.rank - b.rank;
        }
        return 0;
      });
    },

    getAsyncRoutes(): Promise<AppRouteRecordRaw[]> {
      return new Promise((resolve) => {
        // TODO: 从服务器获取权限路由
        resolve([]);
      });
    },

    parseRoute(route: AppRouteRecordRaw): RouteInfo | null {
      if (route.meta.hideMenu) {
        return null;
      }

      const item: RouteInfo = {
        title: route.meta.title as string || '',
        icon: route.meta.icon as string || '',
        path: route.path,
        rank: route.meta.rank as number || 1000,
      };

      if (route.children) {
        const self = this;
        const children: RouteInfo[] = [];
        route.children.forEach((child) => {
          const childItem = self.parseRoute(child as AppRouteRecordRaw);
          if (childItem) {
            children.push(childItem);
          }
        });

        // 如果只有一个子路由，则抛弃之
        if (children.length !== 1) {
          // 路由按照 rank 配置排序
          children.sort((a, b) => {
            if (a.rank && b.rank) {
              return a.rank - b.rank;
            }
            return 0;
          });
          item.children = children;
        }
      }
      return item;
    },
  },
});

const usePermissionStoreWithOut = () => usePermissionStore(store);

export default usePermissionStoreWithOut;
