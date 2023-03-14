import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { PropsWithChildren } from 'react';
import { MenuProvider as PopupProvider } from 'react-native-popup-menu';

export const MenuProvider: React.FC<PropsWithChildren<any>> = ({
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
