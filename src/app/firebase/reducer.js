/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_REGISTER_WITH_PROVIDER_FAILED,
  FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_LOGIN_WITH_PROVIDER_FAILED,
  FIREBASE_LOGOUT_SUCCEEDED,
  FIREBASE_LOGOUT_FAILED,
} from './action-types';

import helper from './helper';
import initialState from '../store/initial-state';

export default function (state = initialState.firebaseContext, action) {
  switch (action.type) {
  case FIREBASE_FETCH_USER_SUCCEEDED:
    if (action.response.userFetched) {
      return Object.assign({}, state, {
        userInfo: {
          userExists: true,
          error: null,
          userId: action.response.userId,
          email: action.response.email,
          displayName: action.response.displayName,
          photoUrl: action.response.photoUrl,
        },
      });
    }

    return Object.assign({}, state, {
      userInfo: {
        userExists: false,
        error: null,
      },
    });

  case FIREBASE_FETCH_USER_FAILED:
    return Object.assign({}, state, {
      userInfo: {
        userExists: false,
        error: action.response.error,
      },
    });

  case FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED:
  case FIREBASE_REGISTER_WITH_PROVIDER_FAILED:
    return action.response;

  case FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED:
  case FIREBASE_LOGIN_WITH_PROVIDER_FAILED:
      return action.response;

  case FIREBASE_LOGOUT_SUCCEEDED:
      return Object.assign({}, state, {
          userInfo: {
              userExists: false,
              error: null,
          },
      });

  case FIREBASE_LOGOUT_FAILED:
      return Object.assign({}, state, {
          userInfo: {
              userExists: false,
              error: action.response.error,
          },
      });

  default:
    return state;
  }
}
