/* jshint esversion: 6 */

import shortid from 'shortid';
import {
  FIREBASE_FETCH_USER,
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD,
  FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
  FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD_FAILED,
  FIREBASE_SIGNUP_WITH_PROVIDER,
  FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNUP_WITH_PROVIDER_FAILED,
  FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD,
  FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
  FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD_FAILED,
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

function createReplyWithUserInfo(type, operationId, userInfo) {
  return {
    type,
    operationId,
    userInfo,
  };
}

function createGenericError(type, operationId, error) {
  return {
    type,
    operationId,
    error,
  };
}

export function fetchUser() {
  return {
    type: FIREBASE_FETCH_USER,
    operationId: shortid.generate(),
  };
}

export function fetchUserSucceeded(operationId, response) {
  const userFetched = response && response.uid;

  return userFetched ? createReplyWithUserInfo(FIREBASE_FETCH_USER_SUCCEEDED, operationId, getUserInfo(response)) :
    createReplyWithUserInfo(FIREBASE_FETCH_USER_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function fetchUserFailed(operationId, error) {
  return createGenericError(FIREBASE_FETCH_USER_FAILED, operationId, error);
}

export function signUpWithEmailAndPassword(emailAddress, password) {
  return {
    type: FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD,
    operationId: shortid.generate(),
    emailAddress,
    password,

  };
}

export function signUpWithEmailAndPasswordSucceeded(operationId, response) {
  return {
    type: FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
    operationId,
  };
}

export function signUpWithEmailAndPasswordFailed(operationId, error) {
  return createGenericError(FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD_FAILED, operationId, error);
}

export function signUpWithProvider(providerName) {
  return {
    type: FIREBASE_SIGNUP_WITH_PROVIDER,
    operationId: shortid.generate(),
    providerName,
  };
}

export function signUpWithProviderSucceeded(operationId, response) {
  const userFetched = response && response.user && response.user.uid;

  return userFetched ?
    createReplyWithUserInfo(FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED, operationId, getUserInfo(response.user)) :
    createReplyWithUserInfo(FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function signUpWithProviderFailed(operationId, error) {
  return createGenericError(FIREBASE_SIGNUP_WITH_PROVIDER_FAILED, operationId, error);
}

export function signInWithEmailAndPassword(emailAddress, password) {
  return {
    type: FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD,
    operationId: shortid.generate(),
    emailAddress,
    password,
  };
}

export function signInWithEmailAndPasswordSucceeded(operationId, response) {
  return {
    type: FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
    operationId,
  };
}

export function signInWithEmailAndPasswordFailed(operationId, error) {
  return createGenericError(FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD_FAILED, operationId, error);
}

export function signInWithProvider(providerName) {
  return {
    type: FIREBASE_SIGNIN_WITH_PROVIDER,
    operationId: shortid.generate(),
    providerName,
  };
}

export function signInWithProviderSucceeded(operationId, response) {
  const userFetched = response && response.user && response.user.uid;

  return userFetched ? createReplyWithUserInfo(FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED, operationId, getUserInfo(
    response.user)) : createReplyWithUserInfo(FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function signInWithProviderFailed(operationId, error) {
  return createGenericError(FIREBASE_SIGNIN_WITH_PROVIDER_FAILED, operationId, error);
}

export function logout() {
  return {
    type: FIREBASE_LOGOUT,
    operationId: shortid.generate(),
  };
}

export function logoutSucceeded(operationId) {
  return {
    type: FIREBASE_LOGOUT_SUCCEEDED,
    operationId,
  };
}

export function logoutFailed(operationId, error) {
  return createGenericError(FIREBASE_LOGOUT_FAILED, operationId, error);
}
