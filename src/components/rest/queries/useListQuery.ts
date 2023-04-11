import type { IRestConfig } from '../shared/types';
import { onLoadFn } from '../shared/managers';
import { createListQueryFn, IPageParam } from '../shared/util';
import { useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';

interface IListConfig
  extends Pick<IRestConfig, 'loading'>,
    Pick<UseQueryOptions, 'enabled'> {}

export const useListQuery = async (key: string, config: IListConfig) => {
  const { loading, enabled } = config;
  const queryFn = createListQueryFn(key, config);
  return useInfiniteQuery([key], queryFn, {
    onSettled: () => onLoadFn(false, loading, false),
    getNextPageParam: (lastPage: unknown, allPages) => {
      const lp = lastPage as IPageParam;
      const count = lp?.count || 0;
      if (allPages.length >= count) {
        return;
      }
      return {
        count,
        length: allPages.length,
        before: lp?.before,
        after: lp?.after,
      };
    },
    enabled,
  });
};
