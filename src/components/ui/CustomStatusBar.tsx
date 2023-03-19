import {
  Platform,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { useThemeStore } from '../../shared/theme';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    height: STATUSBAR_HEIGHT,
  },
});

export const CustomStatusBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
  const pColorDarkHex = useThemeStore().palette.primaryDarkColor;
  return (
    <View style={[styles.statusBar, {backgroundColor: 'transparent'}]}>
      <StatusBar
        translucent
        backgroundColor={props.backgroundColor || pColorDarkHex}
        barStyle="light-content"
        {...props}
      />
    </View>
  );
};
