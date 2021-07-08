/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-28 10:21:55
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Message from '@/components/message/src/message';

// 定义一些状态
const MsgStatus = (status: number) => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }

  return message;
};

// axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  withCredentials: true,
  timeout: 3 * 1000,
});

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        timestamp: new Date().getTime(),
      };
    } else if (config.method === 'get') {
      config.params = {
        timestamp: new Date().getTime(),
        ...config.params,
      };
    }
    // 追加token之类的操作
    return config;
  },
  error => {
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = '服务器异常，请联系管理员！';
    return Promise.resolve(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status;
    let msg = MsgStatus(status);
    if (status < 200 || status >= 300) {
      if (typeof response.data === 'string') {
        response.data = { msg };
      } else {
        response.data.msg = msg;
        response.data.status = false;
      }
    } else {
      response.data.status = true;
    }
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message);
    } else {
      // handle error code
      // 错误抛到业务代码
      error.data = {};
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！';
      error.data.status = false;
      Message({
        type: 'error',
        message: error.data.msg,
      });
    }
    return Promise.reject(error);
  }
);

export default service;
