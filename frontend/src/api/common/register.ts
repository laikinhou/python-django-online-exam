import http from '@/utils/http/index';
import { RegisterForm } from './types';

/**
 * 登录
 */

const userRegisterApi = async (data: RegisterForm): Promise<string> => http.post<string>({
  url: '/api/user/register',
  data,
});

export default userRegisterApi;
