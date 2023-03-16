import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemeStore } from '../theme';

export const ClearButton: React.FC<TouchableOpacityProps> = (props) => {
  const palette = useThemeStore().palette;
  return (
    <TouchableOpacity {...props}>
      <Text style={{ color: palette.primaryColor, textAlign: 'right' }}>Clear</Text>
    </TouchableOpacity>
  );
};
