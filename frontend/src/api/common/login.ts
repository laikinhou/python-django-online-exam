import http from '@/utils/http/index';
import { LoginForm } from './types';

/**
 * 登录
 */

const userLoginApi = async (data: LoginForm): Promise<string> => http.post<string>({
  url: '/api/user/login',
  data,
});

export default userLoginApi;
