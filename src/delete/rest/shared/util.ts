import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  InfiniteData,
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query';
import { Platform } from 'react-native';
import type {
  IRestConfig,
  IUseInfiniteQuery,
  IUseQuery,
  PickedFile,
} from './types';
import { AuthUtils, useAppStore } from '@tisf/rn-providers';
import { subst } from 'urlcat';
import { onErrorFn, onLoadFn, onSuccessFn } from './managers';

export interface UrlConfig {
  url: string;
  method: AxiosRequestConfig['method'];
  urlConfig: AxiosRequestConfig;
}

export const urlFromString = (url: string | AxiosRequestConfig): UrlConfig => {
  const input = typeof url === 'string' ? url : (url.url as string);
  const output = input.split('|');
  const baseURL = input.indexOf('http') >= 0 ? '' : undefined;
  return {
    url: output[0] as string,
    method: output[1] || 'get',
    urlConfig: typeof baseURL === 'string' ? { baseURL } : {},
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
  timeout: 50000,
  validateStatus(status: number): boolean {
    return status >= 200 && status < 500; // default
  },
};

export const defaultHeaders: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
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
  const { method, url, urlConfig } = urlFromString(queryKey);
  const { loading, displaySpinner } = config;
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
  length: number;
  before?: number;
  after?: number;
}

export const createInfiniteQueryFn = (
  queryKey: string,
  config: IRestConfig = {}
): QueryFunction => {
  return ({ pageParam }: QueryFunctionContext<QueryKey, IPageParam>) => {
    const { length, before, after } = pageParam || {};
    const params = config.params || {};
    if (length) {
      params.current = length * 10;
    }
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

export const createQueryOpt = (
  config: IRestConfig,
  options: IUseQuery
): IUseQuery => {
  const {
    onSuccess,
    onError,
    loading,
    displaySpinner,
    displaySuccess,
    displayError,
  } = config;
  return {
    onSuccess: onSuccessFn(onSuccess, displaySuccess),
    onError: onErrorFn(onError, displayError),
    onSettled: () => onLoadFn(false, loading, displaySpinner),
    enabled: false,
    select: (res: unknown) => (res as AxiosResponse).data,
    ...options,
  };
};

export const createInfiniteQueryOpt = (
  config: IRestConfig,
  options: IUseInfiniteQuery
): IUseInfiniteQuery => {
  const { onError, loading } = config;
  return {
    getNextPageParam: (
      lastPage: unknown,
      allPages: Array<unknown>
    ): IPageParam => {
      const lp = lastPage as IPageParam;
      return {
        length: allPages.length + 1,
        before: lp?.before || Date.now(),
        after: lp?.after,
      };
    },
    onSettled: () => onLoadFn(false, loading, false),
    onError: onErrorFn(onError, false),
    enabled: true,
    select: (data: InfiniteData<unknown>) => {
      console.log('=======SELECTED DATA========', data);
      return {
        pages: data.pages.flatMap((page: any) => {
          return page.data.data;
        }),
        pageParams: data.pageParams,
      };
    },
    ...options,
  };
};
