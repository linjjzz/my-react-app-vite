import { message } from 'antd';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  timeout: 10 * 1000
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前进行一些处理，例如添加请求头
    return config;
  },
  (error: any) => {
    // 对请求错误进行处理
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    if (response.status === 200) {
      const { code, data, msg }: ResType = response.data
      if (code === 0) {
        return data as any;
      } else {
        message.error(msg || '请求失败')
      }
    }
  },
  (error) => {
    // 对响应错误进行处理
    return Promise.reject(error);
  }
);

// 定义请求方法
export const http = {
  get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return service.get(url, config);
  },
  post<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return service.post(url, data, config);
  },
  put<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return service.put(url, data, config);
  },
  delete<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return service.delete(url, config);
  },
  patch<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return service.patch(url, data, config);
  },
};


export type ResType = {
  code: number,
  data?: ResDataType,
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}