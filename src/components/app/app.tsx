import React from 'react';
import useCachedResources from './useCachedResources';
import type { PartialTheme } from '../../shared/theme/theme';
import { MenuProvider, OverlayProvider } from '../overlays';
import { ThemeProvider } from './provider';
import type { ReactFC } from '../../shared';
import type { PartialAppState } from '../../shared/models';
import { generateAppInfo } from '../../shared/models';

export type IAppWrapper = {
  theme?: PartialTheme;
  appInfo: PartialAppState;
};

export const AppWrapper: ReactFC<IAppWrapper> = ({
  children,
  theme,
  appInfo
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
        <MenuProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
};
