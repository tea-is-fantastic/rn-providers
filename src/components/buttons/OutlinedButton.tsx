import React from 'react';
import { Button } from 'react-native-paper';
import { englishStyle, IOutlineButton, processIcon } from './shared';
import type { ReactFC } from '../../shared';
import type { StyleProp } from 'react-native';
import { useThemeStore } from '../../shared/theme';

export const OutlinedButton: ReactFC<IOutlineButton> = ({
  children,
  borderColor,
  icon, iconType, buttonColor, textColor,
  style={}, straight, contentStyle={},
  labelStyle={},
  ...props
}) => {
  const palette = useThemeStore().palette;
  const pColor = React.useMemo(() => {
    return buttonColor || palette.primaryColor;
  }, [buttonColor]);

  const bStyle = React.useMemo(() => {
    const output: StyleProp<any> = {height: 50, ...style, borderColor : borderColor || pColor,};
    if (straight) {
      output.borderRadius = 0;
    }
    return output;
  }, [straight]);

  return (
    <Button
      mode="outlined"
      style={bStyle}
      contentStyle={{
        height: '100%',
        alignItems: 'center',
        ...contentStyle
      }}
      labelStyle={{
        ...englishStyle,
        ...labelStyle,
      }}
      textColor={textColor || pColor}
      icon={processIcon(icon, 'light')}
      {...props}>
      {children}
    </Button>
  );
};
