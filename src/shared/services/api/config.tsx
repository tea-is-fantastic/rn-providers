import type {AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import type {APIError, IRestConfig, PickedFile} from './types';
import {manageConfig} from './managers';
import {Endpoint, EndpointService} from './utils';
import { useAppStore } from '../../models/app';

export class RestConfig<T> {
  upload = false;
  files?: PickedFile[];
  displaySuccess = false;
  displayError = true;
  unauth = false;
  displaySpinner = true;
  data?: any;
  endpoint: Endpoint;
  token?: string;
  urlParams?: Record<string, string>;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
  loadingStart?: () => void;
  loadingEnd?: () => void;
  onSuccess?: (response: T) => void;
  onError?: (error: APIError) => void;

  constructor({endpoint, onSuccess, ...config}: IRestConfig) {
    Object.assign(this, config);
    this.endpoint = EndpointService(endpoint);
    this.onSuccess = onSuccess;
  }
}

export const initialConfig = {
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 5000,
  validateStatus(status: number): boolean {
    return status >= 200 && status < 500; // default
  },
};

export const sculpt = async <T,>(
  iConfig: IRestConfig,
): Promise<AxiosRequestConfig> => {
  const config = await manageConfig<T>(iConfig);
  const {
    endpoint,
    data,
    token,
    headers: iHeaders,
    queryParams,
    urlParams,
    upload,
    files,
  } = config;
  const {url, method} = endpoint;
  let headers = iHeaders;
  if (!headers) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  let options: AxiosRequestConfig = {
    ...initialConfig,
    baseURL: useAppStore.getState().urls.api,
    method,
    headers,
    url,
  };
  if (urlParams) {
    options.url = endpoint.getFinalUrl(urlParams);
  }

  if (queryParams) {
    options.params = queryParams;
  }

  if (data) {
    options.data = JSON.stringify(data);
  }

  if (upload && files) {
    const bodyFormData = new FormData();
    bodyFormData.append('model', JSON.stringify(data));
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if(file) {
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
    options.headers = {
      ...options.headers,
      'Content-Type': 'multipart/form-data',
    };
    options.data = bodyFormData;
  }
  return options;
};
