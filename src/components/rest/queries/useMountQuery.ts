import type { IRestConfig } from '../shared/types';
import { onLoadFn } from '../shared/managers';
import { createQueryFn } from '../shared/util';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useMountQuery = (
  key: string,
  loading?: IRestConfig['loading']
): UseQueryResult => {
  const queryFn = createQueryFn(key, { loading });
  return useQuery([key], queryFn, {
    onSettled: () => onLoadFn(false, loading, false),
    enabled: true,
  });
};
