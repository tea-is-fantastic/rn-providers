import type { APIError, APIResponse, IRestConfig } from '../types';
import { onErrorFn, onLoadFn } from '../managers';
import { AlertFactory } from '@tisf/rn-providers';
import { defaultError } from '../util';
import { axiosFn, handleResponse } from './funcs';

export const standalone = async <T>(
  key: string,
  config: IRestConfig
): Promise<APIResponse<T | APIError>> => {
  onLoadFn(true, config);
  try {
    const resp = await axiosFn(key, config);
    const response = (await handleResponse(resp, config)) as T;
    onLoadFn(false, config);
    return { response, success: true, error: false };
  } catch (e) {
    AlertFactory.l(e);
    const resp = e || defaultError;
    const response = (await onErrorFn(resp, config)) as APIError;
    onLoadFn(false, config);
    return { response, success: true, error: false };
  }
};
