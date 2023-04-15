import type { AxiosRequestConfig } from 'axios';
import type {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

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

export interface APISuccess<T = unknown> extends APIDisplay {
  data?: T;
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
  loading?: (x: boolean) => void;
  displaySuccess?: boolean;
  displayError?: boolean;
  displaySpinner?: boolean;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data?: any) => void;
}

export type Endpoint = {
  url: string;
  data?: object;
  params?: AxiosRequestConfig['params'];
};

export type IUseQuery = Omit<
  UseQueryOptions<unknown, unknown, unknown, string[]>,
  'queryKey' | 'queryFn'
>;

export type IUseInfiniteQuery = Omit<
  UseInfiniteQueryOptions<unknown, unknown, unknown, unknown, string[]>,
  'queryKey' | 'queryFn'
>;

export type IUseMutation = Omit<
  UseMutationOptions<unknown, unknown, unknown, string[]>,
  'mutationKey' | 'mutationFn'
>;
