/* jshint esversion: 6 */

import watchFetchUser from '../firebase/sagas/fetch-user';
import watchSignUpWithEmailAndPassword from '../firebase/sagas/signup-with-email-password';
import watchSignUpWithProvider from '../firebase/sagas/signup-with-provider';
import watchSignInWithEmailAndPassword from '../firebase/sagas/signin-with-email-password';
import watchSignInWithProvider from '../firebase/sagas/signin-with-provider';
import watchLogout from '../firebase/sagas/logout';

export default function* sagas() {
  yield [watchFetchUser(),
    watchSignUpWithEmailAndPassword(),
    watchSignUpWithProvider(),
    watchSignInWithEmailAndPassword(),
    watchSignInWithProvider(),
    watchLogout(),
  ];
}
