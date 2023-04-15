import type { IRestConfig } from '../types';
import { create, StoreApi, useStore } from 'zustand';
import { axiosInstance, handleResponse } from '../funcs/funcs';
import { useMemo } from 'react';
import { AlertFactory } from '@tisf/rn-providers';

export interface IListStore<T = any> {
  hasMoreItems: boolean;
  data: T[];
  count: number;
  before: number;
  after: number;
  loading: boolean;
  refreshing: boolean;
  error: boolean;
  config: IRestConfig;
  setData: (input: IListStore) => void;
  setStatus: (status: boolean, refreshing?: boolean) => void;
  setError: (status: boolean) => void;
  setConfig: (input: IRestConfig) => void;
}

export interface IListHelpers {
  load: (current: number) => void;
  loadItems: () => void;
  refresh: () => void;
}

export const createListStore = <T>(conf: IRestConfig) => {
  return create<IListStore<T>>((set) => ({
    hasMoreItems: false,
    data: [],
    count: 0,
    before: 0,
    after: 0,
    loading: false,
    refreshing: false,
    error: false,
    config: conf,
    setData: (resp: IListStore<T>, reset?: boolean) =>
      set((state) => {
        const dataReceived = resp.data || [];
        const countReceived = resp.count;
        const beforeReceived = resp.before;
        const afterReceived = resp.after;
        let newData;
        if (reset) {
          newData = [...dataReceived];
        } else {
          newData = [...state.data, ...dataReceived];
        }
        const hasMoreReceived = newData.length < countReceived;

        return {
          data: newData,
          count: countReceived,
          before: beforeReceived,
          after: afterReceived,
          hasMoreItems: hasMoreReceived,
        };
      }),
    setStatus: (x, y) => {
      if (!x) {
        return set({ refreshing: false, loading: false });
      } else if (y) {
        return set({ refreshing: x });
      } else {
        return set({ loading: x });
      }
    },
    setConfig: (config) => {
      return set({ config });
    },
    setError: (error) => {
      return set({ error });
    },
  }));
};

export const useListQuery = (
  key: string,
  store: StoreApi<IListStore>
): IListHelpers => {
  const { config, ...listStore } = useStore(store);
  const instance = axiosInstance(key, config);
  return useMemo(() => {
    const load = async (current = 0, refresh?: boolean) => {
      if (listStore.loading || listStore.refreshing) {
        return;
      }
      const reset = !current || current <= 0;
      listStore.setStatus(true, !!refresh || reset);

      listStore.setError(false);
      try {
        const resp = await instance({});
        const { response, error } = await handleResponse(resp, {
          displaySuccess: false,
          displayError: false,
        });
        listStore.setStatus(false);
        if (error) {
          listStore.setError(true);
        } else {
          listStore.setData(response as IListStore);
        }
      } catch (e) {
        AlertFactory.l(e);
        listStore.setError(true);
        listStore.setStatus(false);
      }
    };
    const refresh = async () => {
      return load(0, true);
    };
    const loadItems = async (): Promise<void | null> => {
      if (listStore.hasMoreItems) {
        return load(listStore.data.length);
      }
      return null;
    };

    return { load, loadItems, refresh };
  }, [instance, listStore]);
};
