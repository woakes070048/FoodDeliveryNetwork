/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_REGISTER_WITH_PROVIDER_FAILED,
  FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_LOGIN_WITH_PROVIDER_FAILED,
} from './action-types';

import helper from './helper';

export default function (state = null, action) {
  switch (action.type) {
  case FIREBASE_FETCH_USER_SUCCEEDED:
  case FIREBASE_FETCH_USER_FAILED:
    return action.response;

  case FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED:
  case FIREBASE_REGISTER_WITH_PROVIDER_FAILED:
    return action.response;

  case FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED:
  case FIREBASE_LOGIN_WITH_PROVIDER_FAILED:
    return action.response;

  default:
    return state;
  }
}
