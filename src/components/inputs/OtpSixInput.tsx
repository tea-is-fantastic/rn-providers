import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useFormikContext} from 'formik';
import {
  FirebaseModel,
  useFirebaseStore,
} from '../../shared';
import shallow from 'zustand/shallow';
import RNOtpVerify from 'react-native-otp-verify-remastered';

const CELL_COUNT = 6;
const size = (Dimensions.get('window').width - 80) / CELL_COUNT;

export const OtpSixInput = () => {
  const {values, setFieldValue, submitForm} = useFormikContext<FirebaseModel>();
  const [confirm, verif] = useFirebaseStore(
    state => [state.confirm, state.verification],
    shallow,
  );
  const value = React.useMemo(() => values.code, [values.code]);

  const setValue = React.useCallback(
    (val: string) => {
      setFieldValue('code', val);
    },
    [setFieldValue],
  );

  const submit = React.useCallback(async () => {
    if (value?.length === CELL_COUNT) {
      try {
        await submitForm();
      } catch (e) {
        console.log(e);
      }
    }
  }, [submitForm, value]);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  React.useEffect(() => {
    if (confirm || verif) {
      console.log('confirm');
      setFieldValue('code', undefined);
      ref?.current?.focus();
    }
  }, [confirm, verif]);

  React.useEffect(() => {
    const otpHandler = async (message: string) => {
      if (message) {
        console.log(message);
        const otpArr = /(\d{6})/g.exec(message);
        const otp = otpArr ? otpArr[1] : null;
        console.log(otp);
        setFieldValue('code', otp);
      }
    };
    if (Platform.OS === 'android') {
      RNOtpVerify.getOtp()
        .then(() => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log(p));
    }
    return () => {
      if (Platform.OS === 'android') {
        RNOtpVerify.removeListener();
      }
    };
  }, [setFieldValue]);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        onBlur={submit}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    // width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: size,
    height: 60,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});
