/* jshint esversion: 6 */

import watchFetchUser from '../firebase/sagas/fetch-user';
import watchResetPassword from '../firebase/sagas/reset-password';
import watchSendEmailVerification from '../firebase/sagas/send-email-verification';
import watchSignUpWithEmailAndPassword from '../firebase/sagas/signup-with-email-password';
import watchSignUpWithProvider from '../firebase/sagas/signup-with-provider';
import watchSignInWithEmailAndPassword from '../firebase/sagas/signin-with-email-password';
import watchSignInWithProvider from '../firebase/sagas/signin-with-provider';
import watchSignOut from '../firebase/sagas/signout';
import watchUpdateUserPublicProfile from '../firebase/sagas/update-user-public-profile';
import watchUpdatePassword from '../firebase/sagas/update-password';

export default function* sagas() {
  yield [watchFetchUser(),
    watchResetPassword(),
    watchSendEmailVerification(),
    watchSignUpWithEmailAndPassword(),
    watchSignUpWithProvider(),
    watchSignInWithEmailAndPassword(),
    watchSignInWithProvider(),
    watchSignOut(),
    watchUpdateUserPublicProfile(),
    watchUpdatePassword(),
  ];
}
