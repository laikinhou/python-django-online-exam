import Axios, {
  AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError,
} from 'axios';
import { useRouter } from 'vue-router';
import { httpConfig } from '@/utils/http/types';
import { LOGIN_URL } from '@/router/types';
import useUserStoreWithOut from '@/store/modules/user';

class AxiosHttp {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = Axios.create(httpConfig());
    this.httpHookRequest();
    this.httpHookResponse();
  }

  // 请求拦截
  private httpHookRequest(): void {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const userStore = useUserStoreWithOut();
        // 将 Token 添加到 header 中
        if (userStore.hasToken() && config.headers) {
          config.headers[import.meta.env.VITE_AUTH_TOKEN as string] = userStore.userToken;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  // 响应拦截
  private httpHookResponse(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          AxiosHttp.errorHandler(response.status, (response.data as any).message);
        }

        return Promise.reject(error);
      },
    );
  }

  // 异常请求处理
  static errorHandler(status: number, message?: string): void {
    const router = useRouter();
    switch (status) {
      case 401: // 未登录
      case 403: {
        // 跳转到登录页面，并删除 Token 记录
        router.push({ path: LOGIN_URL });
        break;
      }
      default: {
        console.log(message);
      }
    }
  }

  public get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  public post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  public put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  public patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }

  public delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  private request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<T>>(config)
        .then((resp: AxiosResponse<T>) => {
          resolve(resp as any);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const http = new AxiosHttp();
export default http;
