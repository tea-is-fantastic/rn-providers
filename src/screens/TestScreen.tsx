import React from 'react';
import {Text, View} from 'react-native';

export const TestScreen: React.FC<{name: string}> = ({name}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'transparent',
      }}
    >
      <Text>{name} Screen</Text>
    </View>
  );
};
