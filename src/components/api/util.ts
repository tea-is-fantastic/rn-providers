import type { AxiosRequestConfig } from 'axios';
import type { APIError } from './types';

export interface UrlConfig {
  url: string;
  method: AxiosRequestConfig['method'];
  urlConfig: AxiosRequestConfig;
}

export const defaultError: APIError = {
  title: 'Goblin attack!',
  message: 'An unknown error has occurred :(',
};

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

export const defaultConfig: AxiosRequestConfig = {
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 5000,
  validateStatus(status: number): boolean {
    return status >= 200 && status < 500; // default
  },
};

export const defaultHeaders: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
