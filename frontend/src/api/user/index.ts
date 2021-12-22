import http from '@/utils/http/index';
import { UserInfo } from './types';

/**
 * 登录
 */

const getUserInfoApi = async (): Promise<UserInfo> => http.get<UserInfo>({ url: '/api/user/user/get-info/' });

export default getUserInfoApi;
