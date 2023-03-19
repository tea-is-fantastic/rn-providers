export interface SocialLoginOutput {
  firstName: string;
  lastName: string;
  token: string;
  idToken?: string;
  provider: string;
  email: string;
}
