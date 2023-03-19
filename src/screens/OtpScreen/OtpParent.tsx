import React, { MutableRefObject, useContext } from 'react';
import { Formik, FormikContextType } from 'formik';
import { Keyboard } from 'react-native';
import { SnackbarFactory, ReactFC, FirebaseModel, FirebaseAdapter, useFirebaseStore } from '../../shared';
import { AuthUtils, AuthInterface } from '../../shared/models';
import type { IRestConfig } from '../../shared/services/api/types';
import { apiStandalone } from '../../shared/services/api/funcs';

export type IOtpCtx = Partial<FormikContextType<FirebaseModel>> & {
  firebase?: FirebaseAdapter;
};

export const OtpCtx = React.createContext<IOtpCtx>({});

export const useOtpCtx = () => useContext(OtpCtx);

const initialValues: FirebaseModel = {};

function onErrorSubmit() {
  SnackbarFactory.e(
    'An error has occurred. Please ensure that you are entering the ' +
    'correct 6 digit code received on your phone. If you continue to have problems, please contact us.',
  );
}

const OtpParent: ReactFC<any> = ({ children, navigation, route,}) => {
  const [firebase, setFirebase] = React.useState<FirebaseAdapter>();
  const timer = useFirebaseStore(s => s.timer);
  const decrement = useFirebaseStore(s => s.decrement);
  const timeoutRef = React.useRef<ReturnType<typeof setInterval>>(-1 as unknown as NodeJS.Timeout);
  const formikRef = React.useRef<FormikContextType<FirebaseModel>>(null);
  const { phoneNumber } = route.params || {};

  const _afterVerify = React.useCallback(
    async (token: string) => {
      if (!token) {
        SnackbarFactory.d();
        return;
      }
      formikRef.current?.setSubmitting(true);
      let config: IRestConfig = {
        endpoint: 'login',
        displaySpinner: false,
        data: { token },
        unauth: true,
        onError: () => {
          formikRef.current?.setSubmitting(false);
          onErrorSubmit();
        },
        onSuccess: async (r: AuthInterface) => {
          formikRef.current?.setSubmitting(false);
          await AuthUtils.init(r);
          SnackbarFactory.s();
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
        },
      };

      await apiStandalone<AuthInterface>(config);
    },
    [formikRef, navigation.navigate],
  );

  React.useEffect(() => {
    if (formikRef.current) {
      setFirebase(
        new FirebaseAdapter(
          formikRef as MutableRefObject<FormikContextType<FirebaseModel>>,
          _afterVerify,
        ),
      );
    }
  }, [formikRef, phoneNumber]);

  React.useEffect(() => {
    (async function() {
      if (firebase) {
        await firebase.sendCode();
      }
    })();
  }, [firebase]);

  React.useEffect(() => {
    if (timer === 0) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = 0 as unknown as NodeJS.Timeout;
    }
    if (timer > 0) {
      timeoutRef.current = setInterval(() => {
        decrement();
      }, 1000);
    }
    return () => {
      clearInterval(timeoutRef.current);
      timeoutRef.current = -1 as unknown as NodeJS.Timeout;
    };
  }, [decrement, timer]);

  React.useEffect(() => {
    useFirebaseStore.setState({ phoneNumber });
    return () => {
      clearInterval(timeoutRef.current);
      timeoutRef.current = -1 as unknown as NodeJS.Timeout;
      useFirebaseStore.setState({ confirm: undefined, verification: undefined });
    };
  }, [phoneNumber]);

  const submit = React.useCallback(async () => {
    if (firebase) {
      Keyboard.dismiss();
      await firebase.verifyCode();
    }
  }, [firebase]);

  return (
    <OtpCtx.Provider value={{ firebase }}>
      <Formik<FirebaseModel>
        initialValues={initialValues}
        onSubmit={submit}
        innerRef={formikRef}>
        {children}
      </Formik>
    </OtpCtx.Provider>
  );
};

export default OtpParent;
