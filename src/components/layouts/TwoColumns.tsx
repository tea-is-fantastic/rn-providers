import React from 'react';
import {View} from 'react-native';

interface ITwoColumns {
  left?: React.ReactNode;
  right?: React.ReactNode;
  padding?: boolean;
}

export const TwoColumns: React.FC<ITwoColumns> = ({left, right, padding}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
      }}>
      {left ? (
        <View style={{flex: 1, paddingRight: padding ? 5 : 0}}>{left}</View>
      ) : null}

      {right ? (
        <View style={{flex: 1, paddingLeft: padding ? 5 : 0}}>{right}</View>
      ) : null}
    </View>
  );
};
