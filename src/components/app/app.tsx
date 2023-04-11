import React from 'react';
import useCachedResources from './useCachedResources';
import type { PartialTheme } from '../../shared/theme/theme';
import { OverlayProvider } from '../overlays';
import { ThemeProvider } from './provider';
import type { PartialAppState, ReactFC } from '../../shared';
import { generateAppInfo } from '../../shared';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../rest/shared/util';

export type IAppWrapper = {
  theme?: PartialTheme;
  appInfo: PartialAppState;
};

export const AppWrapper: ReactFC<IAppWrapper> = ({
  children,
  theme,
  appInfo,
}) => {
  const isLoadingComplete = useCachedResources();

  React.useEffect(() => {
    generateAppInfo(appInfo);
  }, [appInfo]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <OverlayProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </OverlayProvider>
      </ThemeProvider>
    );
  }
};
