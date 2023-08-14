//APIを叩く前に前処理を行う

import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AxiosClient } from "./axiosClient";

AxiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // リクエストが送信される前の処理
    return {
      ...config,
    };
  },
  function (error) {
    // リクエスト エラーの処理
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        // なにかする
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
