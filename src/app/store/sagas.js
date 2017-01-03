/* jshint esversion: 6 */

import watchFetchUser from '../firebase/sagas/fetch-user';
import watchResetPassword from '../firebase/sagas/reset-password';
import watchSignUpWithEmailAndPassword from '../firebase/sagas/signup-with-email-password';
import watchSignUpWithProvider from '../firebase/sagas/signup-with-provider';
import watchSignInWithEmailAndPassword from '../firebase/sagas/signin-with-email-password';
import watchSignInWithProvider from '../firebase/sagas/signin-with-provider';
import watchSignOut from '../firebase/sagas/signout';

export default function* sagas() {
  yield [watchFetchUser(),
    watchResetPassword(),
    watchSignUpWithEmailAndPassword(),
    watchSignUpWithProvider(),
    watchSignInWithEmailAndPassword(),
    watchSignInWithProvider(),
    watchSignOut(),
  ];
}
