import React from 'react';
import {Button} from 'react-native-paper';
import type {IContainedButton} from './shared';
import type {StyleProp} from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { englishStyle } from './shared';

const processIcon = (
  icon: string,
  iconType?: 'solid' | 'light',
): React.ReactNode | undefined => {
  if (iconType === 'light' && icon) {
    return <FontAwesome5Pro name={icon} color="white" size={18} light style={{marginTop: -2.5, marginLeft: -2.5}} />;
  }
  return <FontAwesome5Pro name={icon} color="white" size={18} solid style={{marginTop: -2.5, marginLeft: -2.5}} />;
};

export const IconButton: React.FC<IContainedButton> = ({
  icon,
  iconType,
  // buttonColor,
  straight,
  ...props
}) => {
  const bStyle = React.useMemo(() => {
    const output: StyleProp<any> = {height: 50};
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
      }}
      labelStyle={{ ...englishStyle }}
      {...props}>
      {processIcon(icon || 'user', iconType)}
    </Button>
  );
};
