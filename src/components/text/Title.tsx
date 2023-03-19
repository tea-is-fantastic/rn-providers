import React from 'react';
import {Text} from 'react-native-paper';
import type { ReactFC } from '../../shared';

export const Title: ReactFC = ({children}) => {
  return (
    <Text
      variant="titleLarge"
      style={{
        marginBottom: 15,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'bold',
      }}>
      {children}
    </Text>
  );
};
