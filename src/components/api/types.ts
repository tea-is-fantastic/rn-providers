import type { AxiosRequestConfig } from 'axios';

export interface APIDisplay {
  message?: string;
  title?: string;
  code?: string;
}

export type PickedFile = {
  uri: string;
  type: string;
  name: string;
  fileName?: string;
};

export interface APIError extends APIDisplay {
  status?: number;
}

export interface APISuccess extends APIDisplay {
  data?: unknown;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  error: boolean;
  response: T;
}

export function isAPIError(response: APIResponse): boolean {
  return !response || response.error || !response.success;
}

export interface IRestConfig
  extends Pick<AxiosRequestConfig, 'data' | 'headers' | 'params'> {
  unauth?: boolean;
  token?: string;
  urlParams?: Record<string, string>;
  loading?: (x: boolean) => void;
  displaySuccess?: boolean;
  displayError?: boolean;
  displaySpinner?: boolean;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export type Endpoint = {
  url: string;
  data?: object;
  params?: AxiosRequestConfig['params'];
};
