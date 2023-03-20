import React from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';

type IOrLogin = {
  content?: string;
  width?: number;
};

export const OrLogin: React.FC<IOrLogin> = ({ content = 'Or Login With', width = 110, }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        alignSelf: 'stretch',
      }}>
      <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
      <View>
        <Text
          variant="bodyMedium"
          style={{
            width,
            textAlign: 'center',
            fontFamily: 'regular'
          }}>
          {content}
        </Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
    </View>
  );
};
