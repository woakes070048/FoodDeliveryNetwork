/* jshint esversion: 6 */

import watchFetchUser from '../firebase/sagas/fetch-user';
import watchSignUpWithUsernameOrEmailAndPassword from '../firebase/sagas/signup-with-username-email-password';
import watchSignUpWithProvider from '../firebase/sagas/signup-with-provider';
import watchSignInWithUsernameOrEmailAndPassword from '../firebase/sagas/signin-with-username-email-password';
import watchSignInWithProvider from '../firebase/sagas/signin-with-provider';
import watchLogout from '../firebase/sagas/logout';

export default function* sagas() {
  yield [watchFetchUser(),
    watchSignUpWithUsernameOrEmailAndPassword(),
    watchSignUpWithProvider(),
    watchSignInWithUsernameOrEmailAndPassword(),
    watchSignInWithProvider(),
    watchLogout(),
  ];
}
