import type { APIError, IRestConfig } from '../types';
import { create, StoreApi, useStore } from 'zustand';
import { axiosInstance, handleResponse } from '../funcs/funcs';
import { useCallback } from 'react';
import { AlertFactory } from '../../../shared';
import { defaultError } from '../util';

export interface IQueryStore<T = any> {
  data: T;
  loading: boolean;
  error?: APIError;
  config: IRestConfig;
  setData: (input: T) => void;
  setLoading: (status: boolean) => void;
  setError: (status?: APIError) => void;
  setConfig: (input: IRestConfig) => void;
}

export const createQueryStore = <T>(conf: IRestConfig) => {
  return create<IQueryStore<T>>((set) => ({
    data: {} as T,
    loading: false,
    refreshing: false,
    config: conf,
    setData: (resp: T) => set({ data: resp }),
    setConfig: (config) => set({ config }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  }));
};

export const useZustandQuery = (key: string, store: StoreApi<IQueryStore>) => {
  const { config, setLoading, setData, setError } = useStore(store);
  const instance = axiosInstance(key, config);
  return useCallback(
    async (conf: IRestConfig = {}) => {
      setLoading(true);
      setError();
      try {
        const resp = await instance({ ...conf });
        const { response, error } = await handleResponse(resp, {
          ...config,
          ...conf,
        });
        setLoading(false);
        if (error) {
          setError(response as APIError);
        } else {
          setData(response);
        }
      } catch (e) {
        AlertFactory.l(e);
        setError(defaultError);
        setLoading(false);
      }
    },
    [config, instance, setData, setError, setLoading]
  );
};
