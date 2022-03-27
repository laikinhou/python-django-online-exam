/* eslint-disable arrow-body-style */
import http from '@/utils/http/index';
import { UserInfo } from '@/types/common';

/**
 * 登录
 */

const getUserInfoApi = async (): Promise<UserInfo> => {
  return http.get<UserInfo>({ url: '/api/user/user/get-info/' });
};

export default getUserInfoApi;
