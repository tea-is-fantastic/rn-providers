import {
  FormikContextType,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
  setNestedObjectValues,
} from 'formik';
import { forOwn } from 'lodash';
import { SnackbarFactory } from '../factories';

export const setFormikTouched = async (
  setTouched: FormikHelpers<any>['setTouched'],
  errors: FormikErrors<any>
) => {
  setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true), true);
};

export const displayFormikError = async (errors: FormikErrors<any>) => {
  const error: string[] = [];
  forOwn(errors, (x) => {
    if (x) {
      error.push(x as string);
    }
  });
  const errormsg: string = error.join(' ');
  SnackbarFactory.e(errormsg);
};

export const validFormikSubmit = async ({
  isValid,
  submitForm,
  setTouched,
  errors,
}: FormikContextType<any>) => {
  if (isValid) {
    await submitForm();
  } else {
    await setFormikTouched(setTouched, errors);
  }
};
