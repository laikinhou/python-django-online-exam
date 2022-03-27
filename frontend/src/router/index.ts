import type { App } from 'vue';
import {
  Router,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouterHistory,
} from 'vue-router';
import { RouteMode } from '@/types/enum';
import { AppRouteRecordRaw, LOGIN_URL } from '@/router/types';
import NProgress from '@/utils/progress';
import useUserStoreWithOut from '@/store/modules/user';
import usePermissionStoreWithOut from '@/store/modules/permission';

class RouteView {
  // 路由对象
  private router: Router | unknown = undefined;

  private routeList: AppRouteRecordRaw[] = [];

  constructor() {
    this.router = this.createRouter();
    this.beforeRouteChange();
    this.afterRouteChange();
  }

  // 根据环境变量中的配置生成路由模式
  static createHistory = (): RouterHistory => {
    if (import.meta.env.VITE_ROUER_MODE === RouteMode.HISTORY) {
      return createWebHistory();
    }
    return createWebHashHistory();
  };

  // 动态获取 modules 目录下的所有 .ts 文件生成基础路由
  private createBasicRoutes = (): AppRouteRecordRaw[] => {
    const moduleFiles = import.meta.globEager('./modules/**/*.ts');
    const routeModuleList: AppRouteRecordRaw[] = [];
    Object.keys(moduleFiles).forEach((key) => {
      const mod = moduleFiles[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      routeModuleList.push(...modList);
    });

    this.routeList = routeModuleList;
    return routeModuleList;
  };

  // 创建路由对象
  private createRouter(): Router {
    return createRouter({
      history: RouteView.createHistory(),
      routes: this.createBasicRoutes(),
      strict: true,
      scrollBehavior: () => ({ left: 0, top: 0 }),
    });
  }

  // 路由守卫
  private beforeRouteChange(): void {
    if (!this.router) {
      return;
    }

    const userStore = useUserStoreWithOut();
    const permissionStore = usePermissionStoreWithOut();
    const router = this.router as Router;
    router.beforeEach((to, _, next) => {
      NProgress.start();

      // 就获取用户的权限路由
      permissionStore.getAsyncRoutes().then((routes) => {
        permissionStore.setRoutes([...this.routeList, ...routes]);
      });

      // 如果没有 Token
      if (!userStore.hasToken()) {
        // 如果当前路由忽略验证
        if (to.meta.ignoreAuth) {
          next();
          return;
        }

        // 跳转到登录页面
        next({ path: LOGIN_URL });
        return;
      }

      // TODO: 获取用户信息
      userStore.setUserInfo();

      // TODO: 这里可以增加权限认证判断

      next();
    });
  }

  private afterRouteChange(): void {
    if (!this.router) {
      return;
    }

    const router = this.router as Router;
    router.afterEach(() => {
      NProgress.done();
    });
  }

  // 获取路由对象
  public getRouter(): Router {
    return this.router as Router;
  }
}

const router = new RouteView();

const setupRouter = (app: App<Element>) => {
  app.use(router.getRouter());
};

export default setupRouter;
