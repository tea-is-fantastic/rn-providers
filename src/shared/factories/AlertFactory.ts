import { AlertType, useAlertStore } from '../../components';

export class AlertFactory {
  static l = (...args: any[]): void => {
    console.log(
      '\x1b[33m============================================\x1b[0m',
      ...args,
      '\x1b[33m============================================\x1b[0m',
    );
  };

  static a = async (body: string, title = 'Alert'): Promise<void> => {
    await useAlertStore.getState().show({
      title,
      type: AlertType.alert,
      body,
    });
  };

  static c = async (
    body: string,
    then: (...x: any[]) => void,
    title = 'Confirm',
    // thenCancel?: (...x: any[]) => void,
  ): Promise<void> => {
    await useAlertStore.getState().show({
      title,
      type: AlertType.confirm,
      body,
      then,
    });
  };

  static u = async (): Promise<void> => {
    await useAlertStore.getState().show({
      title: 'Upgrade',
      type: AlertType.persist,
      body: 'A new upgrade is available',
    });
  };
}
