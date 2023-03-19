import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemeStore } from '../../shared/theme';
import type { ReactFC } from '../../shared';

export const ClearButton: ReactFC<TouchableOpacityProps> = (props) => {
  const palette = useThemeStore().palette;
  return (
    <TouchableOpacity {...props}>
      <Text style={{ color: palette.primaryColor, textAlign: 'right' }}>Clear</Text>
    </TouchableOpacity>
  );
};
