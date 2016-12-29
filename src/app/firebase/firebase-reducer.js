/* jshint esversion: 6 */

import * as Types from './firebase-action-types';
import helper from './helper';

export default function (state = null, action) {
  switch (action.type) {
  case Types.FIREBASE_FETCH_USER_SUCCEEDED:
  case Types.FIREBASE_FETCH_USER_FAILED:
    return action.response;

  case Types.FIREBASE_LOGIN_WITH_EMAIL_PASSWORD:
    return state;

  case Types.FIREBASE_LOGIN_WITH_PROVIDER:
    return helper.loginWithProvider(action.provider);

  default:
    return state;
  }
}
