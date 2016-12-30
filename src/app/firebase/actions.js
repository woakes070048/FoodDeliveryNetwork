/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER,
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
  FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_FAILED,
  FIREBASE_REGISTER_WITH_PROVIDER,
  FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_REGISTER_WITH_PROVIDER_FAILED,
  FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
  FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_FAILED,
  FIREBASE_LOGIN_WITH_PROVIDER,
  FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_LOGIN_WITH_PROVIDER_FAILED,
  FIREBASE_LOGOUT,
  FIREBASE_LOGOUT_SUCCEEDED,
  FIREBASE_LOGOUT_FAILED,
} from './action-types';

function getUserInfo(info) {
  return {
    userFetched: true,
    userId: info.uid,
    email: info.email,
    displayName: info.displayName,
    photoUrl: info.photoURL,
  };
}

function getEmptyUserInfo() {
  return {
    userFetched: false,
  };
}

function createReplyWithUserInfo(type, userInfo) {
  return {
    type,
    userInfo,
  };
}

function createGenericError(type, error) {
  return {
    type,
    error,
  };
}

export function fetchUser() {
  return {
    type: FIREBASE_FETCH_USER,
  };
}

export function fetchUserSucceeded(response) {
  const userFetched = response && response.uid;

  if (userFetched) {
    return createReplyWithUserInfo(FIREBASE_FETCH_USER_SUCCEEDED, getUserInfo(
      response));
  }

  return createReplyWithUserInfo(FIREBASE_FETCH_USER_SUCCEEDED,
    getEmptyUserInfo());
}

export function fetchUserFailed(error) {
  return createGenericError(FIREBASE_FETCH_USER_FAILED, error);
}

export function registerWithUsernameOrEmailAndPassword(usernameOrEmail,
  password) {
  return {
    type: FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    usernameOrEmail,
    password,
  };
}

export function registerWithUsernameOrEmailAndPasswordSucceeded(response) {
  return {
    type: FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  };
}

export function registerWithUsernameOrEmailAndPasswordFailed(error) {
  return createGenericError(
    FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED, error);
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

    return createReplyWithUserInfo(FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
      getUserInfo(
        response.user));
  }

  return createReplyWithUserInfo(FIREBASE_REGISTER_WITH_PROVIDER_SUCCEEDED,
    getEmptyUserInfo());
}

export function registerWithProviderFailed(error) {
  return createGenericError(FIREBASE_REGISTER_WITH_PROVIDER_FAILED, error);
}

export function loginWithUsernameOrEmailAndPassword(usernameOrEmail,
  password) {
  return {
    type: FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    usernameOrEmail,
    password,
  };
}

export function loginWithUsernameOrEmailAndPasswordSucceeded(response) {
  return {
    type: FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  };
}

export function loginWithUsernameOrEmailAndPasswordFailed(error) {
  return createGenericError(
    FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED, error);
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

    return createReplyWithUserInfo(FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
      getUserInfo(
        response.user));
  }

  return createReplyWithUserInfo(FIREBASE_LOGIN_WITH_PROVIDER_SUCCEEDED,
    getEmptyUserInfo());
}

export function loginWithProviderFailed(error) {
  return createGenericError(FIREBASE_LOGIN_WITH_PROVIDER_FAILED, error);
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
  return createGenericError(FIREBASE_LOGOUT_FAILED, error);
}
