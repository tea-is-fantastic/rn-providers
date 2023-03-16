import React from 'react';
import type {ButtonProps, ViewStyle} from "react-native";
import type { ReactNode } from 'react';
import type {ImageSource} from 'react-native-vector-icons/Icon';
import type { StyleProp } from 'react-native';
import type { ButtonProps as PaperButton } from 'react-native-paper';
import type {IconSource} from "react-native-paper/lib/typescript/src/components/Icon";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

export interface IButton extends Omit<ButtonProps, 'color'>, PaperButton {
  buttonColor?: string;
  textColor?: string;
  icon?: string;
  loading?: boolean;
  iconType?: 'solid' | 'light';
  straight?: boolean;
  children: ReactNode | undefined;
}

export interface IOutlineButton extends IButton {
  borderColor?: string;
}

export interface IContainedButton extends IButton {
  style?: ViewStyle;
  labelStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

export interface ICoverWithContent {
  image: ImageSource[];
  children: ReactNode[];
}

export const processIcon = (
    icon?: string,
    iconType?: 'solid' | 'light',
): IconSource | undefined => {
  if (iconType === 'light' && icon) {
    return props => (
        <FontAwesome5Pro name={icon} {...props} light style={{marginTop: -2.5}} />
    );
  } else if (iconType === 'solid' && icon) {
    return props => (
        <FontAwesome5Pro name={icon} {...props} solid style={{marginTop: -2.5}} />
    );
  }
  return icon;
};

export const englishStyle: StyleProp<any> = {
  fontSize: 18,
  fontFamily: 'regular',
};
