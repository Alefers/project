import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';


export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: '',
});

export const addAuthorizationOnRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
};

axiosInstance.interceptors.request.use(addAuthorizationOnRequest, null);
