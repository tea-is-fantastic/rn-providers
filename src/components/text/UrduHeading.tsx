import React from 'react';
import { Text } from 'react-native-elements';
import type { TextStyle } from 'react-native';
import type { ReactFC } from '../../shared';
import { useThemeStore } from '../../shared';

interface IHeading {
  marginBottom?: boolean;
  marginTop?: boolean;
  style?: TextStyle;
  dark?: boolean;
}

export const UrduHeading: ReactFC<IHeading> = ({
  children,
  marginBottom,
  marginTop,
  dark,
  style = {},
}) => {
  const primaryColorHex = useThemeStore().palette.primaryColor
  return (
    <Text
      h4
      h4Style={{
        marginTop: marginTop ? 15 : 0,
        color: dark ? 'white' : primaryColorHex,
        fontSize: 36,
        marginBottom: marginBottom ? 15 : 0,
        fontFamily: 'urdu',
        fontWeight: 'normal',
        lineHeight: 50,
        ...style,
      }}>
      {children}
    </Text>
  );
};
