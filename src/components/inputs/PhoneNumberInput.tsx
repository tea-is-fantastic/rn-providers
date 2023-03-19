import React from 'react';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { Input } from 'react-native-elements';
import { View } from 'react-native';
import { useFormikContext } from 'formik';
import { useThemeStore } from '../../shared/theme';

export interface PhoneModel {
  phoneNumber: string;
  country: CountryCode;
}

export const PhoneNumberInput: React.FC = () => {
  const {values, errors, setFieldValue, submitForm} = useFormikContext<PhoneModel>();
  const value = values.phoneNumber;
  const code = values.country;

  const [focused, setFocused] = React.useState(false);
  const colors = useThemeStore().palette;

  const error = errors.phoneNumber || errors.country;

  const color = error
    ? colors.errorColor
    : focused
    ? colors.primaryColor
    : colors.disabledColor;

  return (
    <View>
      <Input
        label="Mobile Number  موبائل نمبر"
        keyboardType="numeric"
        // autoFocus
        value={value}
        maxLength={11}
        onChangeText={v => setFieldValue('phoneNumber', v)}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onSubmitEditing={submitForm}
        errorStyle={{
          color: colors.errorColor,
          height: error ? undefined : 0,
        }}
        errorMessage={error ? error : undefined}
        leftIcon={
          <CountryPicker
            countryCode={code}
            onSelect={v => setFieldValue('country', v.cca2)}
            withFilter
          />
        }
        leftIconContainerStyle={{
          width: 50,
        }}
        containerStyle={{
          paddingBottom: 0,
        }}
        inputContainerStyle={{
          height: 60,
          borderWidth: 2,
          borderBottomWidth: 2,
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: '#fff',
          borderColor: color,
          borderRadius: 8,
        }}
        inputStyle={{
          height: 50,
          fontFamily: 'regular',
        }}
        labelStyle={{
          fontSize: 13,
          position: 'absolute',
          top: -10,
          left: 30,
          zIndex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 4,
          color,
          fontFamily: 'regular',
          fontWeight: 'normal',
        }}
        placeholder="03333378601"
      />
    </View>
  );
};
