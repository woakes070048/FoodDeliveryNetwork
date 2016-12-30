/* jshint esversion: 6 */

import watchFetchUser from '../firebase/sagas/fetch-user';
import watchRegisterWithUsernameOrEmailAndPassword from '../firebase/sagas/register-with-username-email-password';
import watchRegisterWithProvider from '../firebase/sagas/register-with-provider';
import watchLoginWithUsernameOrEmailAndPassword from '../firebase/sagas/login-with-username-email-password';
import watchLoginWithProvider from '../firebase/sagas/login-with-provider';
import watchLogout from '../firebase/sagas/logout';

export default function* sagas() {
  yield [watchFetchUser(),
    watchRegisterWithUsernameOrEmailAndPassword(),
    watchRegisterWithProvider(),
    watchLoginWithUsernameOrEmailAndPassword(),
    watchLoginWithProvider(),
    watchLogout(),
  ];
}
