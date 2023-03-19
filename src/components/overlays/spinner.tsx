import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { create } from 'zustand';
import type { ReactFC } from '../../shared';

export interface ISpinnerConfig {
  setVisible: (val: boolean) => void;
  visible: boolean;
}

export const useSpinner = create<ISpinnerConfig>((set) => ({
  visible: false,
  setVisible: (visible: boolean) => set({ visible }),
}));

export const showSpinner = () => {
  useSpinner.getState().setVisible(true);
};

export const hideSpinner = () => {
  useSpinner.getState().setVisible(false);
};

export const SpinnerProvider: ReactFC<any> = ({ children }) => {
  const visible = useSpinner((s) => s.visible);

  return (
    <>
      {visible && (
        <Spinner
          visible
          textContent="Loading..."
          textStyle={{ color: '#FFF' }}
        />
      )}
      {children}
    </>
  );
};
