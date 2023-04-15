import type { FormikHelpers } from 'formik';
import type { IRestConfig } from '../types';
import { axiosInstance, handleResponse } from '../funcs/funcs';
import { onErrorFn, onLoadFn } from '../managers';
import { AlertFactory } from '@tisf/rn-providers';
import { defaultError } from '../util';
import { useCallback } from 'react';

export const useFormMutation = (key: string, config: IRestConfig) => {
  const instance = axiosInstance(key, config);
  return useCallback(
    async (data: any, helpers: FormikHelpers<any>) => {
      onLoadFn(true, config);
      try {
        const resp = await instance({ data });
        const output = handleResponse(resp, config);
        helpers.resetForm();
        onLoadFn(false, config);
        return output;
      } catch (e) {
        AlertFactory.l(e);
        await onErrorFn(defaultError, config);
        onLoadFn(false, config);
        return { error: true, success: false, response: defaultError };
      }
    },
    [config, instance]
  );
};
