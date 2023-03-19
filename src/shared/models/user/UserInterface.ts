export interface UserInterface {
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
}
