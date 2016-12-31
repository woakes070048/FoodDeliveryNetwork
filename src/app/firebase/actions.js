/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER,
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
  FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_FAILED,
  FIREBASE_SIGNUP_WITH_PROVIDER,
  FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNUP_WITH_PROVIDER_FAILED,
  FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
  FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_FAILED,
  FIREBASE_SIGNIN_WITH_PROVIDER,
  FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNIN_WITH_PROVIDER_FAILED,
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

export function signUpWithUsernameOrEmailAndPassword(usernameOrEmail,
  password) {
  return {
    type: FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    usernameOrEmail,
    password,
  };
}

export function signUpWithUsernameOrEmailAndPasswordSucceeded(response) {
  return {
    type: FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  };
}

export function signUpWithUsernameOrEmailAndPasswordFailed(error) {
  return createGenericError(
    FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED, error);
}

export function signUpWithProvider(providerName) {
  return {
    type: FIREBASE_SIGNUP_WITH_PROVIDER,
    providerName,
  };
}

export function signUpWithProviderSucceeded(response) {
  const userFetched = response && response.user && response.user.uid;

  if (userFetched) {
    const userInfo = response.user;

    return createReplyWithUserInfo(FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED,
      getUserInfo(
        response.user));
  }

  return createReplyWithUserInfo(FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED,
    getEmptyUserInfo());
}

export function signUpWithProviderFailed(error) {
  return createGenericError(FIREBASE_SIGNUP_WITH_PROVIDER_FAILED, error);
}

export function signInWithUsernameOrEmailAndPassword(usernameOrEmail,
  password) {
  return {
    type: FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    usernameOrEmail,
    password,
  };
}

export function signInWithUsernameOrEmailAndPasswordSucceeded(response) {
  return {
    type: FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED,
  };
}

export function signInWithUsernameOrEmailAndPasswordFailed(error) {
  return createGenericError(
    FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD_SUCCEEDED, error);
}

export function signInWithProvider(providerName) {
  return {
    type: FIREBASE_SIGNIN_WITH_PROVIDER,
    providerName,
  };
}

export function signInWithProviderSucceeded(response) {
  const userFetched = response && response.user && response.user.uid;

  if (userFetched) {
    const userInfo = response.user;

    return createReplyWithUserInfo(FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED,
      getUserInfo(
        response.user));
  }

  return createReplyWithUserInfo(FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED,
    getEmptyUserInfo());
}

export function signInWithProviderFailed(error) {
  return createGenericError(FIREBASE_SIGNIN_WITH_PROVIDER_FAILED, error);
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
