import type { APIError, IRestConfig } from '../types';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { axiosFn, handleResponse } from '../funcs';
import { useCallback } from 'react';
import { AlertFactory } from '../../../shared';
import { shallow } from 'zustand/shallow';

export interface IListStore<T = any> {
  hasMoreItems: boolean;
  data: T[];
  count: number;
  before: number;
  after: number;
  loading: boolean;
  refreshing: boolean;
  error?: APIError;
  config: IRestConfig;
  resetData: () => void;
  setData: (input: IListStore, reset?: boolean) => void;
  setStatus: (status: boolean, refreshing?: boolean) => void;
  setError: (status?: APIError) => void;
  setConfig: (input: IRestConfig) => void;
}

export interface IListHelpers {
  load: (current: number) => void;
  onEndReached: () => void;
  refresh: () => void;
}

const initialData = {
  hasMoreItems: false,
  data: [],
  count: 0,
  before: 0,
  after: 0,
};

export const createListStore = <T>(conf: IRestConfig) => {
  return create<IListStore<T>>((set) => ({
    ...initialData,
    loading: false,
    refreshing: false,
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
    setError: (error) => {
      AlertFactory.l(error);
      return set({ error });
    },
    setConfig: (config) =>
      set((state) => ({
        config: {
          ...state.config,
          ...config,
          params: { ...(state.config.params || {}), ...(config.params || {}) },
        },
      })),
    resetData: () => set({ ...initialData }),
  }));
};

export const useListQuery = <T = any>(
  key: string,
  useStore: UseBoundStore<StoreApi<IListStore<T>>>
) => {
  const { loading, refreshing, config, setData, setError, setStatus } =
    useStore(
      (state) => ({
        setStatus: state.setStatus,
        setData: state.setData,
        setError: state.setError,
        config: state.config,
        loading: state.loading,
        refreshing: state.refreshing,
      }),
      shallow
    );
  return useCallback(
    async (current = 0, refresh?: boolean) => {
      if (loading || refreshing) {
        return;
      }
      const reset = !current || current <= 0;
      setStatus(true, !!refresh || reset);

      setError();
      try {
        const resp = await axiosFn(key, {
          ...config,
          params: { ...config.params, current },
        });
        const response = await handleResponse(resp, {
          displaySuccess: false,
          displayError: false,
        });
        setData(response as IListStore, reset);
        setStatus(false);
      } catch (e) {
        setError(e as APIError);
        setStatus(false);
      }
    },
    [config, key, loading, refreshing, setData, setError, setStatus]
  );
};

// export const useListQuery = <T = any>(
//   key: string,
//   store: StoreApi<IListStore<T>>
// ): IListHelpers<T> => {
//   const { config, loading, refreshing, data, hasMoreItems, ...listStore } =
//     useStore(store);
//   const instance = axiosInstance(key, config);
//   return useMemo(() => {
//     const load = async (current = 0, refresh?: boolean) => {
//       if (loading || refreshing) {
//         return;
//       }
//       const reset = !current || current <= 0;
//       listStore.setStatus(true, !!refresh || reset);
//
//       listStore.setError();
//       try {
//         const resp = await instance();
//         const response = await handleResponse(resp, {
//           displaySuccess: false,
//           displayError: false,
//         });
//         listStore.setData(response as IListStore);
//         listStore.setStatus(false);
//       } catch (e) {
//         listStore.setError(e as APIError);
//         listStore.setStatus(false);
//       }
//     };
//     const refresh = async () => {
//       return load(0, true);
//     };
//     const onEndReached = async (): Promise<void | null> => {
//       if (hasMoreItems) {
//         return load(data.length);
//       }
//       return null;
//     };
//
//     return {
//       load,
//       onEndReached,
//       refresh,
//       loading,
//       refreshing,
//       data,
//     };
//   }, [data, hasMoreItems, instance, listStore, loading, refreshing]);
// };
