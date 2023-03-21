import type React from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import type {FormikContextType} from 'formik';
import { create } from 'zustand';
import { SnackbarFactory } from '../factories/SnackbarFactory';
import { formatPhone } from '../func';
import analytics from '@react-native-firebase/analytics';

export const MAX_TIMER = 60;

type IFirebaseStore = {
  timer: number;
  confirm?: FirebaseAuthTypes.ConfirmationResult;
  verification?: string;
  phoneNumber: string;
  send: () => boolean;
  decrement: () => void;
};

export const useFirebaseStore = create<IFirebaseStore>((set, get) => ({
  timer: -1,
  phoneNumber: '',
  send: () => get().timer <= 0,
  decrement: () => set(state => ({timer: state.timer - 1})),
}));

export interface FirebaseModel {
  phoneNumber?: string;
  code?: string;
}

function onError() {
  SnackbarFactory.e(
    'An error has occurred. Please ensure that you are entering the ' +
      'correct 6 digit code received on your phone. If you continue to have problems, please contact us.',
  );
}

export class FirebaseAdapter {
  formikRef: React.MutableRefObject<FormikContextType<FirebaseModel>>;
  afterVerify: (value: string) => void;

  constructor(
    formikRef: React.MutableRefObject<FormikContextType<FirebaseModel>>,
    afterVerify: (value: string) => void,
  ) {
    this.formikRef = formikRef;
    this.afterVerify = afterVerify;
  }

  afterCodeSent = () => {
    const {setSubmitting} = this.formikRef.current;
    const phoneNumber = useFirebaseStore.getState().phoneNumber;
    SnackbarFactory.s(
      `A code was sent to ${phoneNumber}. ` +
        'Please enter it into the text box and click on Submit to continue',
    );
    setSubmitting(false);
  };

  extractToken = async (user: FirebaseAuthTypes.User) => {
    const {setSubmitting} = this.formikRef.current;
    if (user) {
      const token = await user.getIdToken();
      if (token) {
        await this.afterVerify(token);
      } else {
        setSubmitting(false);
        onError();
      }
    } else {
      setSubmitting(false);
      onError();
    }
  };

  convertCodeToUser = async (
    code: string,
    verif: FirebaseAuthTypes.ConfirmationResult | string,
  ) => {
    try {
      let cred: FirebaseAuthTypes.UserCredential | null;
      if (typeof verif === 'string') {
        const credential = auth.PhoneAuthProvider.credential(verif, code);
        cred = await auth().signInWithCredential(credential);
      } else {
        cred = await verif.confirm(code);
      }
      if (!cred || !cred.user) {
        onError();
      } else {
        await this.extractToken(cred.user);
      }
    } catch (e) {
      onError();
    }
  };

  verifyCode = async () => {
    const {values, setSubmitting} = this.formikRef.current;
    const {code} = values;
    const state = useFirebaseStore.getState();
    const confirm = state.confirm || state.verification;
    console.log('==========100==========', code, confirm);
    if (code && confirm) {
      setSubmitting(true);
      try {
        await this.convertCodeToUser(code, confirm);
      } catch (e) {
        setSubmitting(false);
        onError();
      }
    } else {
      setSubmitting(false);
      onError();
    }
  };

  sendCode = async (resend = false) => {
    const {setSubmitting} = this.formikRef.current;
    const store = useFirebaseStore;
    const state: IFirebaseStore = store.getState();
    const phone: string = formatPhone(state.phoneNumber);
    const send: boolean = state.send();
    const timer: number = state.timer;
    if (!send) {
      setSubmitting(false);
      SnackbarFactory.e(
        `Slow down tiger! You still have ${timer} seconds to go`,
      );
      return;
    }
    try {
      setSubmitting(true);
      store.setState({timer: -1});
      const confirm = await auth().signInWithPhoneNumber(phone, resend);
      store.setState({timer: MAX_TIMER, confirm, verification: undefined});
      this.afterCodeSent();
    } catch (e) {
      SnackbarFactory.d(e);
      setSubmitting(false);
    }
  };

  firebaseAuto = async (resend = false) => {
    const {values, setSubmitting} = this.formikRef.current || {};
    const phoneNumber = String(values.phoneNumber);
    const phone: string = formatPhone(phoneNumber);
    try {
      setSubmitting(true);
      auth()
        .verifyPhoneNumber(phone, 5, resend)
        .on(
          'state_changed',
          phoneAuthSnapshot => {
            switch (phoneAuthSnapshot.state) {
              case auth.PhoneAuthState.CODE_SENT: // or 'sent'
                useFirebaseStore.setState({
                  timer: MAX_TIMER,
                  verification: phoneAuthSnapshot.verificationId,
                  confirm: undefined,
                });
                this.afterCodeSent();
                break;
              // case auth.PhoneAuthState.ERROR: // or 'error'
              //     console.log('verification error');
              //     SnackbarFactory.d(phoneAuthSnapshot.error);
              //     break;

              case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                // console.log('auto verify on android timed out');
                break;
              case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                // console.log('auto verified on android');
                // console.log(phoneAuthSnapshot);
                const {verificationId, code} = phoneAuthSnapshot;
                useFirebaseStore.setState({
                  verification: verificationId,
                  confirm: undefined,
                });
                code && this.convertCodeToUser(code, verificationId);
                break;
            }
          },
          error => {
            // console.log('verification error');
            // console.log(error.verificationId);
            setSubmitting(false);
            SnackbarFactory.d(error);
          },
          () => {
            // console.log(phoneAuthSnapshot);
          },
        );
    } catch (e) {
      SnackbarFactory.d();
      setSubmitting(false);
    }
  };
}

export const FbAnalytics = analytics();

