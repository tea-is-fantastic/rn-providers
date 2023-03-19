import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormikContext } from 'formik';
import { ContainedButton, CustomStatusBar, Title, UrduSubtitle, PhoneNumberInput, BelowText } from '../../components';

const MobileChild: React.FC = () => {
  const {submitForm, isSubmitting} = useFormikContext();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'never'}>
      <SafeAreaView edges={['top', 'bottom']}>
        <Title>Enter your Mobile Number</Title>
        <UrduSubtitle>اپنا موبائل نمبر درج کریں</UrduSubtitle>
        <View style={styles.getStartedContainer}>
          <View style={{marginBottom: 30}}>
            <PhoneNumberInput />
          </View>

          <View style={{marginBottom: 30, alignSelf: 'stretch'}}>
            <ContainedButton
              onPress={async () => {
                await submitForm();
              }}
              iconType="light"
              loading={isSubmitting}
              icon="sign-in">
              Continue
            </ContainedButton>
          </View>

          <BelowText>
            By continuing, you agree to the Terms & Conditions and Privacy Policy.
          </BelowText>
        </View>
        <CustomStatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default MobileChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
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
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'urdu',
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  getStartedText: {
    textAlign: 'center',
  },
  button: {
    height: 50,
  },
  buttonContent: {
    height: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
