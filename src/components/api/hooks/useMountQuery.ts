import type { IRestConfig } from '../types';
import { axiosInstance, handleResponse } from '../funcs/funcs';
import { onErrorFn, onLoadFn } from '../managers';
import { AlertFactory } from '@tisf/rn-providers';
import { defaultError } from '../util';
import { useEffect } from 'react';

export const useMountQuery = (key: string, config: IRestConfig) => {
  const instance = axiosInstance(key, config);
  return useEffect(() => {
    const func = async () => {
      onLoadFn(true, config);
      try {
        const resp = await instance({});
        onLoadFn(false, config);
        return handleResponse(resp, config);
      } catch (e) {
        AlertFactory.l(e);
        await onErrorFn(defaultError, config);
        onLoadFn(false, config);
        return { error: true, success: false, response: defaultError };
      }
    };
    func();
  }, [config, instance]);
};
