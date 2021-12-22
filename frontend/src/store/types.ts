import { UserInfo } from '@/api/user/types';

export interface UserStore {
  userInfo: UserInfo;
  token: string;
}

export interface BasicInfo {

}

export interface RouteInfo {
  title: string;
  icon: string;
  path: string;
  rank?: number;
  children?: RouteInfo[];
}

export interface PermissionInfo {
  routes: RouteInfo[];
}
