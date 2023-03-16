import React from 'react';
import {Button} from 'react-native-paper';
import {IOutlineButton, processIcon} from './shared';

export const OutlinedButton: React.FC<IOutlineButton> = ({
  children,
  borderColor,
  icon, iconType, buttonColor, textColor,
  ...props
}) => {
  return (
    <Button
      mode="outlined"
      style={{
        height: 50,
        borderColor : borderColor || buttonColor,
      }}
      contentStyle={{
        height: '100%',
        alignItems: 'center',
      }}
      labelStyle={{
        fontSize: 18,
        fontFamily: 'regular',
      }}
      textColor={textColor || buttonColor}
      icon={processIcon(icon, iconType)}
      {...props}>
      {children}
    </Button>
  );
};
