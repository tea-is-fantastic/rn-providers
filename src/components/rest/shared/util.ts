import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import {
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query';
import { Platform } from 'react-native';
import type { IRestConfig, PickedFile } from './types';
import { AuthUtils, useAppStore } from '@tisf/rn-providers';
import { subst } from 'urlcat';
import { onLoadFn } from './managers';

export interface UrlConfig {
  url: string;
  method: AxiosRequestConfig['method'];
}

export const urlFromString = (url: string | AxiosRequestConfig): UrlConfig => {
  const input = typeof url === 'string' ? url : (url.url as string);
  const output = input.split('|');
  return {
    url: output[0] as string,
    method: output[1] || 'get',
  };
};

export const sculptUrl = (
  url: string,
  urlParams?: Record<string, string>
): string => {
  return urlParams ? subst(url, urlParams) : url;
};

export const defaultConfig: AxiosRequestConfig = {
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 5000,
  validateStatus(status: number): boolean {
    return status >= 200 && status < 500; // default
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // queryFn,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const axiosFn = (queryKey: string, config: IRestConfig = {}) => {
  const token = AuthUtils.getToken();
  const { method, url } = urlFromString(queryKey);
  const { loading, displaySpinner } = config;
  const headers: AxiosRequestConfig['headers'] = { ...config.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    ...defaultConfig,
    baseURL: useAppStore.getState().urls?.api,
  });

  instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    onLoadFn(true, loading, displaySpinner);
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

export const createQueryFn = (queryKey: string, config: IRestConfig = {}) => {
  return () => axiosFn(queryKey, config);
};

export interface IPageParam {
  count: number;
  length: number;
  before?: number;
  after?: number;
}

export const createListQueryFn = (
  queryKey: string,
  config: IRestConfig = {}
): QueryFunction => {
  return ({ pageParam }: QueryFunctionContext<QueryKey, IPageParam>) => {
    const { length = 0, before, after } = pageParam || {};
    const params = { ...(config.params || {}), current: length };
    if (before) {
      params.before = before;
    }
    if (after) {
      params.after = after;
    }
    return axiosFn(queryKey, {
      ...config,
      params,
    });
  };
};
