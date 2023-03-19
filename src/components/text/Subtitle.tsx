import React from 'react';
import { Text } from 'react-native-paper';
import type { ReactFC } from '../../shared';

export const Subtitle: ReactFC = ({children}) => {
  return (
    <Text
      variant="titleLarge"
      style={{
        textAlign: 'center',
        fontFamily: 'regular',
        marginBottom: 30,
        // fontSize: 20,
        // lineHeight: 30
      }}>
      {children}
    </Text>
  );
};
