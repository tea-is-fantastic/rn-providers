import type { APIResponse, IRestConfig } from '../types';
import { onErrorFn, onLoadFn } from '../managers';
import { AlertFactory } from '@tisf/rn-providers';
import { defaultError } from '../util';
import { axiosFn, handleResponse } from './funcs';

export const standalone = async (
  key: string,
  config: IRestConfig
): Promise<APIResponse> => {
  onLoadFn(true, config);
  try {
    const resp = await axiosFn(key, config);
    return handleResponse(resp, config);
  } catch (e) {
    AlertFactory.l(e);
    await onErrorFn(defaultError, config);
    return { error: true, success: false, response: defaultError };
  } finally {
    onLoadFn(false, config);
  }
};
