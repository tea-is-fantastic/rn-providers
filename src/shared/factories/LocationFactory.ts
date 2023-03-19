import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import GeocoderResponse = Geocoder.GeocoderResponse;
import { AddressModel, IMyLatLng } from '../models';
import { SnackbarFactory } from './SnackbarFactory';
import { useAppStore } from '../models/app';
import { PERMISSIONS } from 'react-native-permissions';

type AddressCallback = (address: AddressModel | null) => void;

export default class LocationFactory {
  static hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        SnackbarFactory.e('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      SnackbarFactory.e('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow this app to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {
            text: "Don't Use Location",
            onPress: () => {},
          },
        ],
      );
    }

    return false;
  };

  static hasLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      const hasPermission = await LocationFactory.hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      SnackbarFactory.e('Location permission denied by user.');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      SnackbarFactory.e('Location permission revoked by user.');
    }

    return false;
  };

  static getCurrentLocation = async (callback: AddressCallback) => {
    const hasLocationPermission = await LocationFactory.hasLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        async position => {
          const latlng: IMyLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          try {
            const address = await LocationFactory.reverseGeocode(latlng);
            callback(address);
          } catch (e) {
            console.log(e);
          }
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    return new AddressModel({});
  };

  static getCurrentAddress = (callback: AddressCallback): void => {
    LocationFactory.getCurrentLocation(async address => {
      if (address?.geo) {
        const output = await LocationFactory.reverseGeocode(address.geo);
        callback(output);
      }
    });
  };

  static geocodeToAddress = (input: GeocoderResponse): AddressModel | null => {
    const res = input.results[0];
    const addComps = res?.address_components;
    if(!addComps) {
      return null;
    }
    const output = new AddressModel({});
    output.geo = res?.geometry.location;
    for (const element of addComps) {
      if (element.types.includes('premise')) {
        output.addressLine1 = element.long_name;
      } else if (element.types.includes('sublocality_level_2')) {
        output.addressLine2 = element.long_name;
      } else if (element.types.includes('sublocality_level_1')) {
        output.area = element.long_name;
      } else if (element.types.includes('locality')) {
        output.city = element.long_name;
      } else if (element.types.includes('administrative_area_level_1')) {
        output.state = element.long_name;
      } else if (element.types.includes('country')) {
        output.country = element.long_name;
      }
    }

    return output;
  };

  static reverseGeocode = async (
    latlng: IMyLatLng,
  ): Promise<AddressModel | null> => {
    const secrets = useAppStore.getState().secrets
    Geocoder.init(secrets.googleMapsApiKey as string);
    try {
      const json = await Geocoder.from(latlng);
      if (json?.results?.length > 0) {
        return LocationFactory.geocodeToAddress(json);
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
}
