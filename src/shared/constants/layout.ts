import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const isSmallDevice = windowWidth < 375;
export const bottomBarHeight = windowWidth / 5;
export const bottomBarPadding = bottomBarHeight + 15;

export const MyRFValue = (x: number) => RFValue(x, windowHeight);
