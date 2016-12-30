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
  FIREBASE_LOGOUT,
  FIREBASE_LOGOUT_SUCCEEDED,
  FIREBASE_LOGOUT_FAILED,
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
      userInfo: {
        userFetched: true,
        userId: response.uid,
        email: response.email,
        displayName: response.displayName,
        photoUrl: response.photoURL,
      },
    };
  }

  return {
    type: FIREBASE_FETCH_USER_SUCCEEDED,
    userInfo: {
      userFetched: false,
    },
  };
}

export function fetchUserFailed(error) {
  return {
    type: FIREBASE_FETCH_USER_FAILED,
    error,
  };
}

export function registerWithProvider(providerName) {
  return {
    type: FIREBASE_REGISTER_WITH_PROVIDER,
    providerName,
  };
}

export function registerWithProviderSucceeded(response) {
  const userFetched = response && response.user && response.user.uid;

  if (userFetched) {
    const userInfo = response.user;

    return {
      type: FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
      userInfo: {
        userFetched: true,
        userId: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName,
        photoUrl: userInfo.photoURL,
      },
    };
  }

  return {
    type: FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
    userInfo: {
      userFetched: false,
    },
  };
}

export function registerWithProviderFailed(error) {
  return {
    type: FIREBASE_REGISTER_WITH_PROVIDER_FAILED,
    error,
  };
}

export function loginWithProvider(providerName) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER,
    providerName,
  };
}

export function loginWithProviderSucceeded(response) {
  const userFetched = response && response.user && response.user.uid;

  if (userFetched) {
    const userInfo = response.user;

    return {
      type: FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
      userInfo: {
        userFetched: true,
        userId: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName,
        photoUrl: userInfo.photoURL,
      },
    };
  }

  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
    userInfo: {
      userFetched: false,
    },
  };
}

export function loginWithProviderFailed(error) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER_FAILED,
    error,
  };
}

export function logout() {
  return {
    type: FIREBASE_LOGOUT,
  };
}

export function logoutSucceeded() {
  return {
    type: FIREBASE_LOGOUT_SUCCEEDED,
  };
}

export function logoutFailed(error) {
  return {
    type: FIREBASE_LOGOUT_FAILED,
    error,
  };
}
