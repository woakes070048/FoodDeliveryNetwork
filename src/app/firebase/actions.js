/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER,
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_REGISTER_WITH_PROVIDER,
  FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_REGISTER_WITH_PROVIDER_FAILED,
  FIREBASE_LOGIN_WITH_PROVIDER,
  FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_LOGIN_WITH_PROVIDER_FAILED,
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

export function registerWithProvider(providerName) {
  return {
    type: FIREBASE_REGISTER_WITH_PROVIDER,
    providerName,
  };
}

export function registerWithProviderSucceeded(response) {
  return {
    type: FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
    response,
  };
}

export function registerWithProviderFailed(error) {
  return {
    type: FIREBASE_REGISTER_WITH_PROVIDER_FAILED,
  };
}

export function loginWithProvider(providerName) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER,
    providerName,
  };
}

export function loginWithProviderSucceeded(response) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
    response,
  };
}

export function loginWithProviderFailed(error) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER_FAILED,
  };
}
