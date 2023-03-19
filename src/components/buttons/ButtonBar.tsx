import React from 'react';
import type { IContainedButton, IOutlineButton } from './shared';
import { ContainedButton } from './ContainedButton';
import type { ReactFC } from '../../shared';
import { View } from 'react-native';
import { OutlinedButton } from './OutlinedButton';

export const ButtonBar: ReactFC = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>
      {children}
    </View>
  );
};

export const LeftButton: ReactFC<IContainedButton> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <ContainedButton
        style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
        contentStyle={{ paddingLeft: 15 }}
        labelStyle={{ fontSize: 12 }}
        {...props}>
        {children}
      </ContainedButton>
    </View>
  );
};

export const RightButton: ReactFC<IContainedButton> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <ContainedButton
        style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
        contentStyle={{ paddingLeft: 15 }}
        labelStyle={{ fontSize: 12 }}
        {...props}>
        {children}
      </ContainedButton>
    </View>
  );
};

export const MiddleButton: ReactFC<IContainedButton> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <ContainedButton
        contentStyle={{ paddingLeft: 15 }}
        labelStyle={{ fontSize: 12 }}
        straight {...props}>
        {children}
      </ContainedButton>
    </View>
  );
};

export const LeftOutlineButton: ReactFC<IOutlineButton> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <OutlinedButton
        style={{ borderRightWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
        contentStyle={{ paddingLeft: 15 }}
        labelStyle={{ fontSize: 12 }}
        {...props}>
        {children}
      </OutlinedButton>
    </View>
  );
};

export const RightOutlineButton: ReactFC<IContainedButton> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <OutlinedButton
        style={{ borderLeftWidth: 0, borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
        contentStyle={{ paddingLeft: 15 }}
        labelStyle={{ fontSize: 12 }}
        {...props}>
        {children}
      </OutlinedButton>
    </View>
  );
};

export const MiddleOutlineButton: ReactFC<IContainedButton> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <OutlinedButton
        contentStyle={{ paddingLeft: 15 }}
        labelStyle={{ fontSize: 12 }}
        straight {...props}>
        {children}
      </OutlinedButton>
    </View>
  );
};
