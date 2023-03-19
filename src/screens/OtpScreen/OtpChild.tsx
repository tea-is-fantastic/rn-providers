import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useFormikContext} from 'formik';
import {useOtpCtx} from './OtpParent';
import { useThemeStore } from '../../shared/theme';
import { FirebaseModel, formatPhone, useFirebaseStore } from '../../shared';
import { OtpSixInput } from '../../components';

const OtpChild: React.FC = () => {
  const {firebase} = useOtpCtx();
  const {isSubmitting} = useFormikContext<FirebaseModel>();
  const timer = useFirebaseStore(s => s.timer);
  const sendFunc = useFirebaseStore(s => s.send);
  const send = React.useMemo(sendFunc, [timer, sendFunc]);
  const phoneNumber = useFirebaseStore(s => s.phoneNumber);
  const primaryColorHex = useThemeStore().palette.primaryColor;

  const formatted = React.useMemo(() => {
    return formatPhone(phoneNumber);
  }, [phoneNumber]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'never'}>
      <View style={{marginBottom: 15}}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/images/otplock.png')}
        />
      </View>

      <Text variant="titleLarge" style={styles.title}>
        We Just Texted You
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Please enter the 6-digit verification code we just sent to {formatted}.{' '}
        Please note that delivery can take a few minutes.
      </Text>
      <View style={styles.getStartedContainer}>
        <View style={{marginBottom: 15}}>
          <OtpSixInput />
        </View>

        {timer >= 0 && (
          <View style={{marginBottom: 30}}>
            {send ? (
              <Text
                variant="titleLarge"
                onPress={() => firebase?.sendCode(true)}
                style={[
                  styles.getStartedText,
                  {color: primaryColorHex, fontWeight: 'bold'},
                ]}>
                Resend
              </Text>
            ) : (
              <Text variant="bodyMedium" style={styles.getStartedText}>
                Resend in {timer}s
              </Text>
            )}
          </View>
        )}

        {isSubmitting && (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OtpChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  title: {
    marginBottom: 15,
    // fontSize: 20,
    // lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    // fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  getStartedContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  getStartedText: {
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
