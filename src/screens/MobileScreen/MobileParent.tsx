import React from 'react';
import {Keyboard} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import {object, Schema, string} from 'yup';
import type { PhoneModel } from '../../components';
import type { ReactFC } from '../../shared';

const initialValues: PhoneModel = {phoneNumber: '', country: 'PK'};

const schema: Schema<PhoneModel> = object().shape({
  phoneNumber: string()
    .matches(/^03\d{9}$/g, 'Invalid Phone. Format 03339078601')
    .required()
    .label('Phone Number'),
  country: string()
    .oneOf(['PK'], 'We have not reached your country yet! Stay tuned <3')
    .required(),
});

const MobileParent: ReactFC<any> = ({children, navigation}) => {
  const [blur, setBlur] = React.useState(false);

  async function submit(
    values: PhoneModel,
    actions: FormikHelpers<PhoneModel>,
  ) {
    const {validateForm, setSubmitting} = actions;
    setSubmitting(true);
    const data = {...values};
    Keyboard.dismiss();
    setBlur(true);
    const errors = await validateForm();
    if (!errors.phoneNumber) {
      navigation.navigate('OtpScreen', data);
      setSubmitting(false);
    }
  }

  return (
    <Formik<PhoneModel>
      initialValues={initialValues}
      onSubmit={submit}
      validateOnChange={false}
      validateOnBlur={blur}
      validationSchema={schema}>
      {children}
    </Formik>
  );
};

export default MobileParent;
