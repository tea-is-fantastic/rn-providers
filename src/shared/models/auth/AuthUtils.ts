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

  static save(auth: AuthModel): AuthModel {
    AuthUtils.calculateExpiry(auth);
    const userStr = auth.userId?.toString();
    LocalStorage.set('token', auth.token || '');
    LocalStorage.set('hash', auth.hash || '');
    LocalStorage.set('ttl', auth.ttl?.toString() || '');
    LocalStorage.set('userId', userStr || '');
    LocalStorage.set('expiry', auth.expiry?.toISOString() || '');
    LocalStorage.set('created', auth.created?.toISOString() || '');
    if (userStr) {
      OneSignal.setExternalUserId(userStr, auth.hash);
      FbAnalytics.setUserId(userStr);
    }
    return auth;
  }

  static remove() {
    LocalStorage.multiremove([
      'token',
      'ttl',
      'userId',
      'expiry',
      'created',
      'hash',
    ]);
    OneSignal.removeExternalUserId();
    FbAnalytics.setUserId(null);
  }

  static getToken() {
    return LocalStorage.get('token') || undefined;
  }

  static init(input?: AuthInterface): AuthModel | undefined {
    if (input) {
      const output = new AuthModel(input);
      return AuthUtils.save(output);
    }
    const token = AuthUtils.getToken();
    if (token) {
      const created = String(LocalStorage.get('created'));
      const ttlStr = LocalStorage.get('ttl');
      const ttl = Number(ttlStr);
      const userId = LocalStorage.get('userId');
      const hash = LocalStorage.get('hash');
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

  static simplify = (
    auth: AuthModel | undefined
  ): AuthInterface | undefined => {
    return auth ? JSON.parse(JSON.stringify(auth)) : undefined;
  };
}
