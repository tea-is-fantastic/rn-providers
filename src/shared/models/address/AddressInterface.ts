import type { UserInterface } from '../user';
import type {IMyLatLng} from './LatLng';

export interface AddressInterface {
  id?: number;
  fullName?: string;
  phoneNumber?: string;
  type?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  area?: string;
  zip?: string;
  state?: string;
  country?: string;
  note?: string;
  geo?: IMyLatLng;
  isDefault?: boolean;
  verified?: boolean;
  consumer?: UserInterface;
  formattedAddress?: string;
}
