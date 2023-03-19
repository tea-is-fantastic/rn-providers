import { UserModel } from '../user';
import type { AddressInterface } from './AddressInterface';
import type {IMyLatLng} from './LatLng';

export class AddressModel {
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
  geo?: IMyLatLng;
  note?: string;
  isDefault?: boolean;
  verified?: boolean;
  consumer?: UserModel;
  formattedAddress?: string;

  get addressLine(): string {
    let x = this.addressLine1 || '';
    if (this.addressLine2) {
      if (x === null) {
        x = this.addressLine2;
      } else {
        x += ` ${this.addressLine2}`;
      }
    }
    return x;
  }

  get stateStr(): string {
    let x = this.state || '';
    if (this.zip) {
      if (x === null) {
        x = this.zip;
      } else {
        x += ` ${this.zip}`;
      }
    }
    return x;
  }

  get completeAddress(): string {
    return `${this.addressLine}${this.area ? `, ${this.area}` : ''}, ${
      this.lastLine
    }`;
  }

  get lastLine() {
    return `${this.city}${this.stateStr ? `, ${this.stateStr}` : ''}, Pakistan`;
  }

  constructor({consumer, ...source}: AddressInterface) {
    Object.assign(this, source);
    if(consumer) {
      this.consumer = new UserModel(consumer);
    }
  }
}
