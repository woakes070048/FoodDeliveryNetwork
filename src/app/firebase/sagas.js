/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_FETCH_USER,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD,
  USER_ACCESS_SIGNUP_WITH_PROVIDER,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD,
  USER_ACCESS_SIGNIN_WITH_PROVIDER,
  USER_ACCESS_SIGNOUT,
  USER_ACCESS_RESET_PASSWORD,
  USER_ACCESS_UPDATE_PASSWORD,
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE,
  USER_ACCESS_SEND_EMAIL_VERIFICATION,
} from '../user-access/action-types';
import {
  fetchUserSucceeded,
  fetchUserFailed,
  resetPasswordSucceeded,
  resetPasswordFailed,
  sendEmailVerificationSucceeded,
  sendEmailVerificationFailed,
  signInWithEmailAndPasswordSucceeded,
  signInWithEmailAndPasswordFailed,
  signInWithProviderSucceeded,
  signInWithProviderFailed,
  signOutSucceeded,
  signOutFailed,
  signUpWithEmailAndPasswordSucceeded,
  signUpWithEmailAndPasswordFailed,
  signUpWithProviderSucceeded,
  signUpWithProviderFailed,
  updatePasswordSucceeded,
  updatePasswordFailed,
  updateUserPublicProfileSucceeded,
  updateUserPublicProfileFailed,
} from '../user-access/actions';
import helper from './helper';

function getUserInfo(response) {
  return {
    userExists: true,
    userId: response.uid,
    emailAddress: response.email,
    emailAddressVerified: response.emailVerified,
    userPublicProfileDetails: {
      preferredName: response.displayName,
      photoUrl: response.photoURL,
    },
  };
}

function getEmptyUserInfo() {
  return {
    userExists: false,
  };
}

function* fetchUserAsync(action) {
  try {
    const response = yield call(helper.fetchUser);
    const userExists = response && response.uid;
    const userInfo = userExists ? getUserInfo(response) : getEmptyUserInfo();

    yield put(fetchUserSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(fetchUserFailed(action.operationId, exception.message));
  }
}

export function* watchFetchUser() {
  yield takeLatest(USER_ACCESS_FETCH_USER, fetchUserAsync);
}

function* resetPasswordAsync(action) {
  try {
    yield call(helper.resetPassword, action.emailAddress);
    yield put(resetPasswordSucceeded(action.operationId));
  } catch (exception) {
    yield put(resetPasswordFailed(action.operationId, exception.message));
  }
}

export function* watchResetPassword() {
  yield takeLatest(USER_ACCESS_RESET_PASSWORD, resetPasswordAsync);
}

function* sendEmailVerificationAsync(action) {
  try {
    yield call(helper.sendEmailVerification);
    yield put(sendEmailVerificationSucceeded(action.operationId));
  } catch (exception) {
    yield put(sendEmailVerificationFailed(action.operationId, exception.message));
  }
}

export function* watchSendEmailVerification() {
  yield takeLatest(USER_ACCESS_SEND_EMAIL_VERIFICATION, sendEmailVerificationAsync);
}

function* signInWithEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.signInWithEmailAndPassword, action.emailAddress, action.password);
    const userExists = response && response.uid;
    const userInfo = userExists ? getUserInfo(response) : getEmptyUserInfo();

    yield put(signInWithEmailAndPasswordSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(signInWithEmailAndPasswordFailed(action.operationId, exception.message));
  }
}

export function* watchSignInWithEmailAndPassword() {
  yield takeLatest(USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPasswordAsync);
}

function* signInWithProviderAsync(action) {
  try {
    const response = yield call(helper.signInWithProvider, action.providerName);
    const userExists = response && response.user && response.user.uid;
    const userInfo = userExists ? getUserInfo(response.user) : getEmptyUserInfo();

    yield put(signInWithProviderSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(signInWithProviderFailed(action.operationId, exception.message));
  }
}

export function* watchSignInWithProvider() {
  yield takeLatest(USER_ACCESS_SIGNIN_WITH_PROVIDER, signInWithProviderAsync);
}

function* signOutAsync(action) {
  try {
    yield call(helper.signOut);
    yield put(signOutSucceeded(action.operationId));
  } catch (exception) {
    yield put(signOutFailed(action.operationId, exception.message));
  }
}

export function* watchSignOut() {
  yield takeLatest(USER_ACCESS_SIGNOUT, signOutAsync);
}

function* signUpWithEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.signUpWithEmailAndPassword, action.emailAddress, action.password);
    const userExists = response && response.uid;
    const userInfo = userExists ? getUserInfo(response) : getEmptyUserInfo();

    yield put(signUpWithEmailAndPasswordSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(signUpWithEmailAndPasswordFailed(action.operationId, exception.message));
  }
}

export function* watchSignUpWithEmailAndPassword() {
  yield takeLatest(USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD, signUpWithEmailAndPasswordAsync);
}

function* signUpWithProviderAsync(action) {
  try {
    const response = yield call(helper.signUpWithProvider, action.providerName);
    const userExists = response && response.user && response.user.uid;
    const userInfo = userExists ? getUserInfo(response.user) : getEmptyUserInfo();

    yield put(signUpWithProviderSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(signUpWithProviderFailed(action.operationId, exception.message));
  }
}

export function* watchSignUpWithProvider() {
  yield takeLatest(USER_ACCESS_SIGNUP_WITH_PROVIDER, signUpWithProviderAsync);
}

function* updatePasswordAsync(action) {
  try {
    yield call(helper.updatePassword, action.newPassword);
    yield put(updatePasswordSucceeded(action.operationId));
  } catch (exception) {
    yield put(updatePasswordFailed(action.operationId, exception.message));
  }
}

export function* watchUpdatePassword() {
  yield takeLatest(USER_ACCESS_UPDATE_PASSWORD, updatePasswordAsync);
}

function* updateUserPublicProfileAsync(action) {
  try {
    yield call(helper.updateUserPublicProfile, action.preferredName);
    yield put(updateUserPublicProfileSucceeded(action.operationId));
  } catch (exception) {
    yield put(updateUserPublicProfileFailed(action.operationId, exception.message));
  }
}

export function* watchUpdateUserPublicProfile() {
  yield takeLatest(USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE, updateUserPublicProfileAsync);
}
