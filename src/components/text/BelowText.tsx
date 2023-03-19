import React from 'react';
import {Text} from 'react-native-paper';
import type { ReactFC } from '../../shared';
import type { ColorValue } from 'react-native';

export const BelowText: ReactFC<{color?: ColorValue}> = ({children, color}) => {
  return (
    <Text
      variant="bodySmall"
      style={{
        textAlign: 'center',
        fontFamily: 'regular',
        color
      }}>
      {children}
    </Text>
  );
};
