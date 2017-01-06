/* jshint esversion: 6 */

import shortid from 'shortid';
import {
  FIREBASE_ACKNOWLEDGE_OPERATION,
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
  FIREBASE_SIGNOUT,
  FIREBASE_SIGNOUT_SUCCEEDED,
  FIREBASE_SIGNOUT_FAILED,
  FIREBASE_RESET_PASSWORD,
  FIREBASE_RESET_PASSWORD_SUCCEEDED,
  FIREBASE_RESET_PASSWORD_FAILED,
  FIREBASE_UPDATE_USER_PUBLIC_PROFILE,
  FIREBASE_UPDATE_USER_PUBLIC_PROFILE_SUCCEEDED,
  FIREBASE_UPDATE_USER_PUBLIC_PROFILE_FAILED,
} from './action-types';

function getUserInfo(info) {
  return {
    userFetched: true,
    userId: info.uid,
    emailAddress: info.email,
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

export function acknowledgeOperaation(operationId) {
  return {
    type: FIREBASE_ACKNOWLEDGE_OPERATION,
    operationId,
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
  const userFetched = response && response.uid;

  return userFetched ? createReplyWithUserInfo(FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId,
      getUserInfo(response)) :
    createReplyWithUserInfo(FIREBASE_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId, getEmptyUserInfo());
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
  const userFetched = response && response.uid;

  return userFetched ? createReplyWithUserInfo(FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId,
      getUserInfo(response)) :
    createReplyWithUserInfo(FIREBASE_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId, getEmptyUserInfo());
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

export function signOut() {
  return {
    type: FIREBASE_SIGNOUT,
    operationId: shortid.generate(),
  };
}

export function signOutSucceeded(operationId) {
  return {
    type: FIREBASE_SIGNOUT_SUCCEEDED,
    operationId,
  };
}

export function signOutFailed(operationId, error) {
  return createGenericError(FIREBASE_SIGNOUT_FAILED, operationId, error);
}

export function resetPassword(emailAddress) {
  return {
    type: FIREBASE_RESET_PASSWORD,
    operationId: shortid.generate(),
    emailAddress,
  };
}

export function resetPasswordSucceeded(operationId) {
  return {
    type: FIREBASE_RESET_PASSWORD_SUCCEEDED,
    operationId,
  };
}

export function resetPasswordFailed(operationId, error) {
  return createGenericError(FIREBASE_RESET_PASSWORD_FAILED, operationId, error);
}

export function updateUserPublicProfile(displayName, emailAddress) {
  return {
    type: FIREBASE_UPDATE_USER_PUBLIC_PROFILE,
    operationId: shortid.generate(),
    displayName,
    emailAddress,
  };
}

export function updateUserPublicProfileSucceeded(operationId) {
  return {
    type: FIREBASE_UPDATE_USER_PUBLIC_PROFILE_SUCCEEDED,
    operationId,
  };
}

export function updateUserPublicProfileFailed(operationId, error) {
  return createGenericError(FIREBASE_UPDATE_USER_PUBLIC_PROFILE_FAILED, operationId, error);
}
