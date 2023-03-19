import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { MenuProvider as PopupProvider } from 'react-native-popup-menu';
import type { ReactFC } from '../../shared';

export const MenuProvider: ReactFC<any> = ({
  children,
}) => {
  return (
    <BottomSheetModalProvider>
      <PopupProvider style={{ flex: 1, minHeight: '100%' }}>
        {children}
      </PopupProvider>
    </BottomSheetModalProvider>
  );
};
