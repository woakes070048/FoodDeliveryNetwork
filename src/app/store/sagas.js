/* jshint esversion: 6 */

import {
  watchFetchUser,
  watchSignUpWithEmailAndPassword,
  watchSignInWithEmailAndPassword,
  watchSignOut,
  watchUpdateUserPublicProfile,
} from '../parse-server/sagas';

import {
  watchResetPassword,
  watchSendEmailVerification,
  watchSignUpWithProvider,
  watchSignInWithProvider,
  watchUpdatePassword,
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
