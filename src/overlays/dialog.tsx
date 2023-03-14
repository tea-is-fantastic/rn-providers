import React, { PropsWithChildren } from 'react';
import Dialog from 'react-native-dialog';
import { Platform } from 'react-native';

import create from 'zustand';

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  show: async (props) => set({ ...props, visible: true }),
  onHide: () => set({ visible: false }),
}));

export interface ModalProps {
  visible: boolean;
  then?: (...x: any[]) => void;
  onHide: () => void;
}

export enum AlertType {
  'alert',
  'confirm',
  'persist',
}

export type AlertProps = Omit<AlertState, 'onHide' | 'visible' | 'show'>;

export interface AlertState extends ModalProps {
  type?: AlertType;
  title?: string;
  body?: string;
  show: (opt: AlertProps) => Promise<void>;
}

export const DialogProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const { visible, type, title, body, then, onHide } = useAlertStore();

  const close = React.useCallback(async () => {
    if (type !== AlertType.persist) {
      onHide && onHide();
    }
  }, [type, onHide]);

  const thenFunc = React.useCallback(async () => {
    await close();
    if (then) {
      then();
    }
  }, [close, then]);

  return (
    <>
      {visible && (
        <Dialog.Container visible onRequestClose={close}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{body}</Dialog.Description>
          {type === AlertType.alert && (
            <Dialog.Button label="OK" onPress={close} />
          )}
          {type === AlertType.confirm && (
            <Dialog.Button
              style={{
                ...Platform.select({
                  android: {
                    marginRight: 20,
                  },
                }),
              }}
              label="No"
              onPress={close}
            />
          )}
          {type === AlertType.confirm && (
            <Dialog.Button label="Yes" onPress={thenFunc} />
          )}
        </Dialog.Container>
      )}
      {children}
    </>
  );
};
