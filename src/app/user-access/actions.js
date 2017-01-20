/* jshint esversion: 6 */

import shortid from 'shortid';
import {
  USER_ACCESS_ACKNOWLEDGE_OPERATION,
  USER_ACCESS_FETCH_USER,
  USER_ACCESS_FETCH_USER_SUCCEEDED,
  USER_ACCESS_FETCH_USER_FAILED,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_FAILED,
  USER_ACCESS_SIGNUP_WITH_PROVIDER,
  USER_ACCESS_SIGNUP_WITH_PROVIDER_SUCCEEDED,
  USER_ACCESS_SIGNUP_WITH_PROVIDER_FAILED,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_FAILED,
  USER_ACCESS_SIGNIN_WITH_PROVIDER,
  USER_ACCESS_SIGNIN_WITH_PROVIDER_SUCCEEDED,
  USER_ACCESS_SIGNIN_WITH_PROVIDER_FAILED,
  USER_ACCESS_SIGNOUT,
  USER_ACCESS_SIGNOUT_SUCCEEDED,
  USER_ACCESS_SIGNOUT_FAILED,
  USER_ACCESS_RESET_PASSWORD,
  USER_ACCESS_RESET_PASSWORD_SUCCEEDED,
  USER_ACCESS_RESET_PASSWORD_FAILED,
  USER_ACCESS_UPDATE_PASSWORD,
  USER_ACCESS_UPDATE_PASSWORD_SUCCEEDED,
  USER_ACCESS_UPDATE_PASSWORD_FAILED,
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE,
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_SUCCEEDED,
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_FAILED,
  USER_ACCESS_SEND_EMAIL_VERIFICATION,
  USER_ACCESS_SEND_EMAIL_VERIFICATION_SUCCEEDED,
  USER_ACCESS_SEND_EMAIL_VERIFICATION_FAILED,
} from './action-types';

function getUserInfo(info) {
  return {
    userFetched: true,
    userId: info.id,
    emailAddress: info.getEmail(),
    emailAddressVerified: info.get('emailVerified'),
    displayName: info.get('displayName'),
    photoUrl: '', //info.photoURL,
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
    type: USER_ACCESS_FETCH_USER,
    operationId: shortid.generate(),
  };
}

export function acknowledgeOperation(operationId) {
  return {
    type: USER_ACCESS_ACKNOWLEDGE_OPERATION,
    operationId,
  };
}

export function fetchUserSucceeded(operationId, response) {
  const userFetched = response && response.id;

  return userFetched ? createReplyWithUserInfo(USER_ACCESS_FETCH_USER_SUCCEEDED, operationId, getUserInfo(response)) :
    createReplyWithUserInfo(USER_ACCESS_FETCH_USER_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function fetchUserFailed(operationId, error) {
  return createGenericError(USER_ACCESS_FETCH_USER_FAILED, operationId, error);
}

export function signUpWithEmailAndPassword(emailAddress, password) {
  return {
    type: USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD,
    operationId: shortid.generate(),
    emailAddress,
    password,

  };
}

export function signUpWithEmailAndPasswordSucceeded(operationId, response) {
  const userFetched = response && response.id;

  return userFetched ? createReplyWithUserInfo(USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId,
      getUserInfo(response)) :
    createReplyWithUserInfo(USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function signUpWithEmailAndPasswordFailed(operationId, error) {
  return createGenericError(USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_FAILED, operationId, error);
}

export function signUpWithProvider(providerName) {
  return {
    type: USER_ACCESS_SIGNUP_WITH_PROVIDER,
    operationId: shortid.generate(),
    providerName,
  };
}

export function signUpWithProviderSucceeded(operationId, response) {
  const userFetched = response && response.user && response.user.uid;

  return userFetched ?
    createReplyWithUserInfo(USER_ACCESS_SIGNUP_WITH_PROVIDER_SUCCEEDED, operationId, getUserInfo(response.user)) :
    createReplyWithUserInfo(USER_ACCESS_SIGNUP_WITH_PROVIDER_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function signUpWithProviderFailed(operationId, error) {
  return createGenericError(USER_ACCESS_SIGNUP_WITH_PROVIDER_FAILED, operationId, error);
}

export function signInWithEmailAndPassword(emailAddress, password) {
  return {
    type: USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD,
    operationId: shortid.generate(),
    emailAddress,
    password,
  };
}

export function signInWithEmailAndPasswordSucceeded(operationId, response) {
  const userFetched = response && response.id;

  return userFetched ? createReplyWithUserInfo(USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId,
      getUserInfo(response)) :
    createReplyWithUserInfo(USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED, operationId, getEmptyUserInfo());
}

export function signInWithEmailAndPasswordFailed(operationId, error) {
  return createGenericError(USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_FAILED, operationId, error);
}

export function signInWithProvider(providerName) {
  return {
    type: USER_ACCESS_SIGNIN_WITH_PROVIDER,
    operationId: shortid.generate(),
    providerName,
  };
}

export function signInWithProviderSucceeded(operationId, response) {
  const userFetched = response && response.user && response.user.uid;

  return userFetched ? createReplyWithUserInfo(USER_ACCESS_SIGNIN_WITH_PROVIDER_SUCCEEDED, operationId, getUserInfo(
    response.user)) : createReplyWithUserInfo(USER_ACCESS_SIGNIN_WITH_PROVIDER_SUCCEEDED, operationId,
    getEmptyUserInfo());
}

export function signInWithProviderFailed(operationId, error) {
  return createGenericError(USER_ACCESS_SIGNIN_WITH_PROVIDER_FAILED, operationId, error);
}

export function signOut() {
  return {
    type: USER_ACCESS_SIGNOUT,
    operationId: shortid.generate(),
  };
}

export function signOutSucceeded(operationId) {
  return {
    type: USER_ACCESS_SIGNOUT_SUCCEEDED,
    operationId,
  };
}

export function signOutFailed(operationId, error) {
  return createGenericError(USER_ACCESS_SIGNOUT_FAILED, operationId, error);
}

export function resetPassword(emailAddress) {
  return {
    type: USER_ACCESS_RESET_PASSWORD,
    operationId: shortid.generate(),
    emailAddress,
  };
}

export function resetPasswordSucceeded(operationId) {
  return {
    type: USER_ACCESS_RESET_PASSWORD_SUCCEEDED,
    operationId,
  };
}

export function resetPasswordFailed(operationId, error) {
  return createGenericError(USER_ACCESS_RESET_PASSWORD_FAILED, operationId, error);
}

export function updatePassword(newPassword) {
  return {
    type: USER_ACCESS_UPDATE_PASSWORD,
    operationId: shortid.generate(),
    newPassword,
  };
}

export function updatePasswordSucceeded(operationId) {
  return {
    type: USER_ACCESS_UPDATE_PASSWORD_SUCCEEDED,
    operationId,
  };
}

export function updatePasswordFailed(operationId, error) {
  return createGenericError(USER_ACCESS_UPDATE_PASSWORD_FAILED, operationId, error);
}

export function updateUserPublicProfile(displayName) {
  return {
    type: USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE,
    operationId: shortid.generate(),
    displayName,
  };
}

export function updateUserPublicProfileSucceeded(operationId) {
  return {
    type: USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_SUCCEEDED,
    operationId,
  };
}

export function updateUserPublicProfileFailed(operationId, error) {
  return createGenericError(USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_FAILED, operationId, error);
}

export function sendEmailVerification() {
  return {
    type: USER_ACCESS_SEND_EMAIL_VERIFICATION,
    operationId: shortid.generate(),
  };
}

export function sendEmailVerificationSucceeded(operationId) {
  return {
    type: USER_ACCESS_SEND_EMAIL_VERIFICATION_SUCCEEDED,
    operationId,
  };
}

export function sendEmailVerificationFailed(operationId, error) {
  return createGenericError(USER_ACCESS_SEND_EMAIL_VERIFICATION_FAILED, operationId, error);
}
