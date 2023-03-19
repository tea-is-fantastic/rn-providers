import React from 'react';
import {Button} from 'react-native-paper';
import {englishStyle, IContainedButton, processIcon} from './shared';
import type {StyleProp} from 'react-native';
import type { ReactFC } from '../../shared';

export const ContainedButton: ReactFC<IContainedButton> = ({
  children,
  icon,
  iconType,
  style = {},
  // buttonColor,
  labelStyle = {},
  contentStyle = {},
  straight,
  ...props
}) => {
  const bStyle = React.useMemo(() => {
    const output: StyleProp<any> = {height: 50, ...style};
    if (straight) {
      output.borderRadius = 0;
    }
    return output;
  }, [straight]);
  return (
    <Button
      mode="contained"
      style={bStyle}
      contentStyle={{
        height: '100%',
        alignItems: 'center',
        ...contentStyle
      }}
      labelStyle={{...englishStyle, ...labelStyle}}
      icon={processIcon(icon, iconType)}
      {...props}>
      {children}
    </Button>
  );
};
