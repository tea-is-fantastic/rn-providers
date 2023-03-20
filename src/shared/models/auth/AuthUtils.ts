import moment, { type Moment } from 'moment';
import { AuthModel } from './AuthModel';
import type { AuthInterface } from './AuthInterface';
import OneSignal from 'react-native-onesignal';
import { FbAnalytics, LocalStorage } from '../../adapters';

export class AuthUtils {
  static calculateExpiry = (auth: AuthModel): Moment | undefined => {
    let expiry;
    if (auth.ttl) {
      const created = auth.created || new Date();
      const add = auth.ttl - 86400;
      expiry = moment(created).add(add, 's');
      auth.expiry = expiry;
    }
    return expiry;
  };

  static calculateTtl = (auth: AuthModel): number | undefined => {
    let ttl;
    if (auth.expiry) {
      const created = auth.created || new Date();
      ttl = auth.expiry.diff(moment(created), 's');
      auth.ttl = ttl;
    }
    return ttl;
  };

  static raw(auth: AuthInterface): AuthModel {
    const { token, expiry, ttl, created, userId, hash } = auth;
    const a = new AuthModel({ token, userId, created, expiry, hash });
    if (ttl) {
      AuthUtils.calculateExpiry(a);
    } else {
      AuthUtils.calculateTtl(a);
    }
    return a;
  }

  static async save(auth: AuthModel): Promise<AuthModel> {
    AuthUtils.calculateExpiry(auth);
    const userStr = auth.userId?.toString();
    await LocalStorage.set('token', auth.token || '');
    await LocalStorage.set('hash', auth.hash || '');
    await LocalStorage.set('ttl', auth.ttl?.toString() || '');
    await LocalStorage.set('userId', userStr || '');
    await LocalStorage.set('expiry', auth.expiry?.toISOString() || '');
    await LocalStorage.set('created', auth.created?.toISOString() || '');
    if (userStr) {
      OneSignal.setExternalUserId(userStr, auth.hash);
      await FbAnalytics.setUserId(userStr);
    }
    return auth;
  }

  static async remove() {
    await LocalStorage.multiremove([
      'token',
      'ttl',
      'userId',
      'expiry',
      'created',
      'hash',
    ]);
    OneSignal.removeExternalUserId();
    await FbAnalytics.setUserId(null);
  }

  static async getToken() {
    return (await LocalStorage.get('token')) || undefined;
  }

  static async init(input?: AuthInterface): Promise<AuthModel | undefined> {
    if (input) {
      const output = new AuthModel(input);
      return AuthUtils.save(output);
    }
    const token = await AuthUtils.getToken();
    if (token) {
      const created = String(await LocalStorage.get('created'));
      const ttlStr = await LocalStorage.get('ttl');
      const ttl = Number(ttlStr);
      const userId = await LocalStorage.get('userId');
      const hash = await LocalStorage.get('hash');
      const auth = new AuthModel({
        token,
        ttl,
        userId: Number(userId),
        created,
        hash,
      });
      AuthUtils.calculateExpiry(auth);
      return auth;
    }
    return undefined;
  }

  static isAuth = (auth: AuthInterface | undefined): boolean => {
    return !!(auth && auth.token) || !!(auth && auth.id);
  };

  static simplify = (auth: AuthModel | undefined): AuthInterface | undefined => {
    return auth ? JSON.parse(JSON.stringify(auth)) : undefined;
  };
}
