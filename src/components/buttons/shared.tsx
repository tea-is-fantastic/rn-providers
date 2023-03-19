import React from 'react';
import type {ButtonProps, ViewStyle} from "react-native";
import type { ReactNode } from 'react';
import type {ImageSource} from 'react-native-vector-icons/Icon';
import type { StyleProp } from 'react-native';
import type { ButtonProps as PaperButton, IconButtonProps } from 'react-native-paper';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

export interface IButton extends Omit<ButtonProps, 'color' | 'title'>, Omit<PaperButton, 'children'> {
  buttonColor?: string;
  textColor?: string;
  icon?: string;
  loading?: boolean;
  iconType?: 'solid' | 'light';
  straight?: boolean;
}

export interface IContainedButton extends IButton {
  style?: ViewStyle;
  labelStyle?: StyleProp<any>;
  contentStyle?: ViewStyle;
}

export interface IOutlineButton extends IContainedButton {
  borderColor?: string;
}

export interface ICoverWithContent {
  image: ImageSource[];
  children: ReactNode[];
}

export const processIcon = (
    icon?: string,
    iconType?: 'solid' | 'light',
): IconButtonProps['icon'] | undefined => {
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
