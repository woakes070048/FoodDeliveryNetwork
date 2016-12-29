/* jshint esversion: 6 */

import * as actionTypes from './action-types';
import helper from './helper';

export default function (state = null, action) {
  switch (action.type) {
  case actionTypes.FIREBASE_FETCH_USER_SUCCEEDED:
  case actionTypes.FIREBASE_FETCH_USER_FAILED:
    return action.response;

  case actionTypes.FIREBASE_LOGIN_WITH_EMAIL_PASSWORD:
    return state;

  case actionTypes.FIREBASE_LOGIN_WITH_PROVIDER:
    return helper.loginWithProvider(action.provider);

  default:
    return state;
  }
}
