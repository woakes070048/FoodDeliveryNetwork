/* jshint esversion: 6 */

import watchFetchUser from '../firebase/sagas/fetch-user';
import watchRegisterWithProvider from '../firebase/sagas/register-with-provider';
import watchLoginWithProvider from '../firebase/sagas/login-with-provider';

export default function* sagas() {
  yield [watchFetchUser(),
    watchRegisterWithProvider(),
    watchLoginWithProvider(),
  ];
}
