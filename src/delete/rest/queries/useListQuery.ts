import type { IRestConfig, IUseInfiniteQuery } from '../shared/types';
import { createInfiniteQueryFn, createInfiniteQueryOpt } from '../shared/util';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export const useListQuery = (
  key: string,
  config: IRestConfig = {},
  options: IUseInfiniteQuery = {}
): UseInfiniteQueryResult => {
  const queryFn = createInfiniteQueryFn(key, config);
  const opt = createInfiniteQueryOpt(config, options);
  return useInfiniteQuery([key], queryFn, opt);
};
