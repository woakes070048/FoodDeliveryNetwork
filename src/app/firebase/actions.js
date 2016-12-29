/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER,
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_REGISTER_WITH_EMAIL_PASSWORD,
  FIREBASE_LOGIN_WITH_EMAIL_PASSWORD,
  FIREBASE_LOGIN_WITH_PROVIDER,
} from './action-types';

export function fetchUser() {
  return {
    type: FIREBASE_FETCH_USER,
  };
}

export function fetchUserSucceeded(response) {
  const userFetched = response && response.uid;

  if (userFetched) {
    return {
      type: FIREBASE_FETCH_USER_SUCCEEDED,
      response: {
        userFetched: true,
        userId: response.uid,
        displayName: response.displayName,
      },
    };
  } else {
    return {
      type: FIREBASE_FETCH_USER_SUCCEEDED,
      response: {
        userFetched: false,
      },
    };
  }
}

export function fetchUserFailed(error) {
  return {
    type: FIREBASE_FETCH_USER_FAILED,
    response: {
      error,
    },
  };
}

export function registerWithEmailPassword(email, password) {
  return {
    type: FIREBASE_REGISTER_WITH_EMAIL_PASSWORD,
    email,
    password,
  };
}

export function loginWithEmailPassword(email, password) {
  return {
    type: FIREBASE_LOGIN_WITH_EMAIL_PASSWORD,
    email,
    password,
  };
}

export function loginWithProvider(provider) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER,
    provider,
  };
}
