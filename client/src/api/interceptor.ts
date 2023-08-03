//APIを叩く前に前処理を行う

import { AxiosError, AxiosResponse } from "axios";
import { AxiosClient, getToken } from "./axiosClient";

AxiosClient.interceptors.request.use(async (config) => {
  if (config.headers !== undefined) {
    const token = getToken(); // getTokenを同期的に実行してトークンを取得する
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

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
