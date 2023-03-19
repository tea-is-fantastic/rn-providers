import { AlertAdapter } from '../adapters/AlertAdapter';
import Toast from 'react-native-simple-toast';

export class SnackbarFactory {
  static s = (message?: string, title = 'Success'): void => {
    return AlertAdapter.success(message, title);
  };

  static e = (message?: string, title = 'Error'): void => {
    return AlertAdapter.error(message, title);
  };

  static d = (err?: any): void => {
    console.log(err);
    return AlertAdapter.error('An unknown error has occurred');
  };

  static c = (): void => {
    return AlertAdapter.info('Coming Soon!');
  };

  static i = (message: string, title?: string): void => {
    return AlertAdapter.info(message, title);
  };

  static w = (message: string, title?: string): void => {
    return AlertAdapter.warn(message, title);
  };

  static t = (message: string): void => {
    Toast.show(message, Toast.SHORT);
  };
}
