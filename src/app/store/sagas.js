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

export default function* sagas() {
  yield [watchFetchUser(),
    watchResetPassword(),
    watchSendEmailVerification(),
    watchSignUpWithEmailAndPassword(),
    watchSignInWithEmailAndPassword(),
    watchSignOut(),
    watchUpdateUserPublicProfile(),
    watchUpdatePassword(),
  ];
}
