/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNUP_WITH_PROVIDER_FAILED,
  FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNIN_WITH_PROVIDER_FAILED,
  FIREBASE_LOGOUT_SUCCEEDED,
  FIREBASE_LOGOUT_FAILED,
} from './action-types';

import initialState from '../store/initial-state';

function createStateWithUserInfo(state, userInfo) {
  return Object.assign({}, state, {
    userInfo: {
      userExists: true,
      error: null,
      userId: userInfo.userId,
      email: userInfo.email,
      displayName: userInfo.displayName,
      photoUrl: userInfo.photoUrl,
    },
  });
}

function createStateWithoutUserInfo(state, error = null) {
  return Object.assign({}, state, {
    userInfo: {
      userExists: false,
      error,
    },
  });
}

function handleFetchUserSucceeded(state, action) {
  if (action.userInfo.userFetched) {
    return createStateWithUserInfo(state, action.userInfo);
  }

  return createStateWithoutUserInfo(state);
}

function handleSignUpSucceeded(state, action) {
  if (action.userInfo.userFetched) {
    return createStateWithUserInfo(state, action.userInfo);
  }

  return createStateWithoutUserInfo(state);
}

function handleSignInSucceeded(state, action) {
  if (action.userInfo.userFetched) {
    return createStateWithUserInfo(state, action.userInfo);
  }

  return createStateWithoutUserInfo(state);
}

export default function (state = initialState.firebaseContext, action) {
  switch (action.type) {
  case FIREBASE_FETCH_USER_SUCCEEDED:
    return handleFetchUserSucceeded(state, action);

  case FIREBASE_FETCH_USER_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  case FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED:
    return handleSignUpSucceeded(state, action);

  case FIREBASE_SIGNUP_WITH_PROVIDER_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  case FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED:
    return handleSignInSucceeded(state, action);

  case FIREBASE_SIGNIN_WITH_PROVIDER_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  case FIREBASE_LOGOUT_SUCCEEDED:
    return createStateWithoutUserInfo(state);

  case FIREBASE_LOGOUT_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  default:
    return state;
  }
}
