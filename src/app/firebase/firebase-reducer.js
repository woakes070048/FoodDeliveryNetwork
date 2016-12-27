/* jshint esversion: 6 */

import * as Types from './firebase-action-types';
import InitialState from '../store/initial-state';

export default function (state = InitialState.firebaseContext, action) {
  switch (action.type) {
  case Types.FIREBASE_REGISTER_WITH_EMAIL_PASSWORD:
    return state;

  case Types.FIREBASE_LOGIN_WITH_EMAIL_PASSWORD:
    return state;

  case Types.FIREBASE_LOGIN_WITH_PROVIDER:
    return state;

  default:
    return state;
  }
}
