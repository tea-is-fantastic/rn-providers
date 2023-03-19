import type { UserInterface } from './UserInterface';

export class UserModel {
  id?: number;
  displayName?: string;
  slug?: string;
  profilePhoto?: string;
  smsVerified?: boolean;
  emailVerified?: boolean;
  personVerified?: boolean;
  invitationVerified?: boolean;
  idVerified?: boolean;
  paymentVerified?: boolean;
  addressVerified?: boolean;
  locationVerified?: boolean;
  policeVerified?: boolean;

  constructor(input: UserInterface) {
    Object.assign(this, input);
  }
}
