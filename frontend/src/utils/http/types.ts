import { AxiosRequestConfig } from 'axios';
import { ContentTypeEnum } from '@/types/enum';

/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_URL ? import.meta.env.VITE_APP_BASE_URL as string : '',
  // 10秒超时
  timeout: 10000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
};

// 取消指定的属性
function excludeProps<T extends { [key: string]: any }>(
  origin: T,
  prop: string,
): { [key: string]: T } {
  return Object.keys(origin)
    .filter((key) => !prop.includes(key))
    .reduce((res, key) => {
      res[key] = origin[key];
      return res;
    }, {} as { [key: string]: T });
}

export const httpConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config) {
    return defaultConfig;
  }

  const { headers } = config;
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers,
    };
  }
  return { ...excludeProps(config!, 'headers'), ...defaultConfig };
};
