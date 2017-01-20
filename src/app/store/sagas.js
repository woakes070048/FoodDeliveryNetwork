/* jshint esversion: 6 */

import {
  watchFetchUser,
  watchSignUpWithEmailAndPassword,
  watchSignInWithEmailAndPassword,
  watchSignOut,
  watchUpdateUserPublicProfile,
  watchSendEmailVerification,
  watchResetPassword,
  watchUpdatePassword,
} from '../parse-server/sagas';

import {
  watchSignUpWithProvider,
  watchSignInWithProvider,
} from '../firebase/sagas';

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
