import { Platform } from 'react-native';
import { Permission, requestMultiple, RESULTS } from 'react-native-permissions';
import forOwn from 'lodash/forOwn';

class PermissionsFactory {
  static checkMultiple = async (
    permissions: Permission[],
  ): Promise<boolean | undefined> => {
    if (Platform.OS === 'android') {
      try {
        const grants = await requestMultiple(permissions);
        let output = true;
        forOwn(grants, (i) => {
          if (i !== RESULTS.GRANTED) {
            output = false;
          }
        });
        return output;
      } catch (err) {
        return false;
      }
    }
    return undefined;
  };

  static requestMultiple = async (
    permissions: Permission[],
  ): Promise<boolean | undefined> => {
    if (Platform.OS === 'android') {
      try {
        const grants = await requestMultiple(permissions);
        let output = true;
        forOwn(grants, (i) => {
          if (i !== RESULTS.GRANTED) {
            output = false;
          }
        });
        return output;
      } catch (err) {
        return false;
      }
    }
    return undefined;
  };
}

export default PermissionsFactory;
