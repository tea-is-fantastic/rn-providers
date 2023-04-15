import type { AxiosRequestConfig } from 'axios';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { APIError, APIResponse, IRestConfig, PickedFile } from '../types';
import { onErrorFn, onSuccessFn } from '../managers';
import { AuthUtils, useAppStore } from '../../../shared';
import {
  defaultConfig,
  defaultError,
  defaultHeaders,
  urlFromString,
} from '../util';
import { Platform } from 'react-native';

export const axiosInstance = (key: string, config: IRestConfig = {}) => {
  const token = AuthUtils.getToken();
  const { method, url, urlConfig } = urlFromString(key);

  const headers: AxiosRequestConfig['headers'] = {
    ...defaultHeaders,
    ...config.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    ...defaultConfig,
    baseURL: useAppStore.getState()?.urls?.api,
    ...urlConfig,
    ...config,
    url,
    method,
  });

  instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log(
      'Starting Request',
      JSON.stringify(
        { url: request.url, data: request.data, params: request.params },
        null,
        2
      )
    );
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      console.log('Response:', JSON.stringify(response.data, null, 2));
      return response;
    },
    (error) => {
      console.log(
        'Response:',
        JSON.stringify(error?.response?.data || {}, null, 2)
      );
      return Promise.reject(error);
    }
  );
  return instance;
};

export const axiosFn = (key: string, config: IRestConfig = {}) => {
  const token = AuthUtils.getToken();
  const { method, url, urlConfig } = urlFromString(key);

  const headers: AxiosRequestConfig['headers'] = {
    ...defaultHeaders,
    ...config.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    ...defaultConfig,
    baseURL: useAppStore.getState()?.urls?.api,
    ...urlConfig,
  });

  instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log(
      'Starting Request',
      JSON.stringify(
        { url: request.url, data: request.data, params: request.params },
        null,
        2
      )
    );
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      console.log('Response:', JSON.stringify(response.data, null, 2));
      return response;
    },
    (error) => {
      console.log(
        'Response:',
        JSON.stringify(error?.response?.data || {}, null, 2)
      );
      return Promise.reject(error);
    }
  );
  return instance({
    ...config,
    method,
    url,
    headers,
  });
};

export const handleUpload = (
  files: PickedFile[],
  data: any
): AxiosRequestConfig => {
  const bodyFormData = new FormData();
  bodyFormData.append('model', JSON.stringify(data));
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      bodyFormData.append('upload', {
        name: file.name,
        type: file.type,
        uri:
          Platform.OS === 'android'
            ? file.uri
            : file.uri.replace('file://', ''),
      });
    }
  }
  return {
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
};

export const handleResponse = async <T,>(
  resp: AxiosResponse<{
    response?: any;
    error?: any;
  }>,
  config: IRestConfig
): Promise<APIResponse<T | APIError>> => {
  const { response, error } = resp.data;
  if (error || response === undefined) {
    return onErrorFn(error || defaultError, config);
  }
  return onSuccessFn(response, config);
};
