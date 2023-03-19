import moment, {type Moment} from 'moment';
import type { AuthInterface } from './AuthInterface';

export class AuthModel {
  token?: string;

  hash?: string;

  ttl?: number;

  expiry?: Moment;

  userId?: number;

  created?: Moment;

  constructor(input: AuthInterface) {
    const {id, token, ttl, userId, created, expiry, hash} = input || {};
    this.token = id || token;
    this.ttl = ttl;
    this.hash = hash;
    this.expiry = expiry ? moment(expiry) : undefined;
    this.userId = userId;
    this.created = created ? moment(created) : undefined;
  }
}
