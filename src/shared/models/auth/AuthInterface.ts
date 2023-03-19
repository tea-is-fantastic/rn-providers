export interface AuthInterface {
  id?: string;
  token?: string;
  hash?: string;
  ttl?: number;
  expiry?: string;
  created?: string;
  userId?: number;
  loggedOut?: boolean;
}
