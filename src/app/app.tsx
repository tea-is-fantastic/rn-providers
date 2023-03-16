import React, { FC } from 'react';
import useCachedResources from './useCachedResources';
import type { PartialTheme } from '../theme/theme';
import { MenuProvider, OverlayProvider } from '../overlays';
import { ThemeProvider } from './provider';

export type IAppWrapper = {
  theme?: PartialTheme;
};

export const AppWrapper: FC<IAppWrapper> = ({
  children,
  theme,
}) => {
  const isLoadingComplete = useCachedResources();

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
