export interface UserInfo {
  username: string;
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
