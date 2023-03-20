import {MMKV} from 'react-native-mmkv';
import {forOwn} from 'lodash';

export const storage = new MMKV();

export class LocalStorage {
  static get = (key: string, defaultValue?: string): string | undefined => {
    const x = storage.getString(key);
    return x || defaultValue;
  };

  static getBool = (key: string, defaultValue = false): boolean => {
    const x = storage.getBoolean(key);
    return x === undefined ? defaultValue : x;
  };

  static getInt = async (key: string, defaultValue = -1): Promise<number> => {
    const x = storage.getNumber(key);
    return x === undefined ? defaultValue : x;
  };

  static set = (key: string, value: any) => {
    return storage.set(key, value);
  };

  static delete = (key: string) => {
    return storage.delete(key);
  };

  static clear = () => {
    return storage.clearAll();
  };

  static multiremove = async (keys: string[]) => {
    for (const i of keys) {
      storage.delete(i);
    }
  };

  static multiadd = async (obj: Record<string, any>) => {
    forOwn(obj, function (value: any, key: string) {
      storage.set(key, value);
    });
  };
}
