import React from 'react';
import OtpParent from './OtpParent';
import OtpChild from './OtpChild';

export const OtpScreen: React.FC = props => {
  return (
    <OtpParent {...props}>
      <OtpChild />
    </OtpParent>
  );
};
