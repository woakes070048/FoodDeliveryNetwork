/* jshint esversion: 6 */

import watchFetchUser from '../user-access/sagas/fetch-user';
import watchResetPassword from '../user-access/sagas/reset-password';
import watchSendEmailVerification from '../user-access/sagas/send-email-verification';
import watchSignUpWithEmailAndPassword from '../user-access/sagas/signup-with-email-password';
import watchSignUpWithProvider from '../user-access/sagas/signup-with-provider';
import watchSignInWithEmailAndPassword from '../user-access/sagas/signin-with-email-password';
import watchSignInWithProvider from '../user-access/sagas/signin-with-provider';
import watchSignOut from '../user-access/sagas/signout';
import watchUpdateUserPublicProfile from '../user-access/sagas/update-user-public-profile';
import watchUpdatePassword from '../user-access/sagas/update-password';

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
