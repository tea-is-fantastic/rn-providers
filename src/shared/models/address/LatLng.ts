export interface IMyLatLng {
  lat: number;
  lng: number;
}

export class MyLatLng implements IMyLatLng {
  lat: number;
  lng: number;

  constructor({lat, lng}: IMyLatLng) {
    this.lat = lat;
    this.lng = lng;
  }
}
