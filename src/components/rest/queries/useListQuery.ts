import type { IRestConfig, IUseListQuery } from '../shared/types';
import { onLoadFn } from '../shared/managers';
import { createListQueryFn, IPageParam } from '../shared/util';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export const useListQuery = (
  key: string,
  config: IRestConfig = {},
  options: IUseListQuery = {}
): UseInfiniteQueryResult => {
  const { loading } = config;
  const { enabled } = options;
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
    ...options,
  });
};
