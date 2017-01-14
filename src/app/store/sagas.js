/* jshint esversion: 6 */

import {
  watchFetchUser,
  watchResetPassword,
  watchSendEmailVerification,
  watchSignUpWithEmailAndPassword,
  watchSignUpWithProvider,
  watchSignInWithEmailAndPassword,
  watchSignInWithProvider,
  watchSignOut,
  watchUpdateUserPublicProfile,
  watchUpdatePassword,
} from '../user-access/sagas';

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
