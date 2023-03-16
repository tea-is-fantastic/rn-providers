import React from 'react';
import type {IContainedButton} from './shared';
import ContainedButton from "./ContainedButton";

export const LeftButton: React.FC<IContainedButton> = ({
  children,
  ...props
}) => {
  return (
    <ContainedButton
      style={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
      contentStyle={{paddingLeft: 15}}
      {...props}>
      {children}
    </ContainedButton>
  );
};

export const RightButton: React.FC<IContainedButton> = ({
  children,
  ...props
}) => {
  return (
    <ContainedButton
      style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
      contentStyle={{paddingLeft: 15}}
      {...props}>
      {children}
    </ContainedButton>
  );
};

export const MiddleButton: React.FC<IContainedButton> = ({
  children,
  ...props
}) => {
  return (
    <ContainedButton
      contentStyle={{paddingLeft: 15}}
      straight {...props}>
      {children}
    </ContainedButton>
  );
};
