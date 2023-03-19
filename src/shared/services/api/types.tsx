import type {Method} from 'axios';
import type { IEndpoint } from "./endpoints";

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

export interface IRestConfig {
  upload?: boolean;
  files?: PickedFile[];
  displaySuccess?: boolean;
  displayError?: boolean;
  unauth?: boolean;
  displaySpinner?: boolean;
  data?: any;
  endpoint: IEndpoint | TEndpoint;
  token?: string;
  urlParams?: Record<string, string>;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
  loadingStart?: () => void;
  loadingEnd?: () => void;
  onSuccess?: (response: any) => void;
  onError?: (error: APIError) => void;
}

export type TEndpoint = [url: string, method?: Method];
