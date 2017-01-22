/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_FETCH_USER,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD,
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
  signOutSucceeded,
  signOutFailed,
  signUpWithEmailAndPasswordSucceeded,
  signUpWithEmailAndPasswordFailed,
  updatePasswordSucceeded,
  updatePasswordFailed,
  updateUserPublicProfileSucceeded,
  updateUserPublicProfileFailed,
} from '../user-access/actions';
import helper from './helper';

function getUserInfo(response) {
  const person = response.get('person');
  const personName = person.get('personName');
  const contactDetails = person.get('contactDetails');

  return {
    userExists: true,
    userId: response.id,
    emailAddress: response.getEmail(),
    emailAddressVerified: response.get('emailVerified'),
    publicProfileDetails: {
      salutation: personName.get('salutation'),
      firstName: personName.get('firstName'),
      middleName: personName.get('middleName'),
      lastName: personName.get('lastName'),
      preferredName: personName.get('preferredName'),
      phone: contactDetails.get('phone'),
      mobile: contactDetails.get('mobile'),
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
    const userExists = response && response.id;
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
    const userExists = response && response.id;
    const userInfo = userExists ? getUserInfo(response) : getEmptyUserInfo();

    yield put(signInWithEmailAndPasswordSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(signInWithEmailAndPasswordFailed(action.operationId, exception.message));
  }
}

export function* watchSignInWithEmailAndPassword() {
  yield takeLatest(USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPasswordAsync);
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
    const userExists = response && response.id;
    const userInfo = userExists ? getUserInfo(response) : getEmptyUserInfo();

    yield put(signUpWithEmailAndPasswordSucceeded(action.operationId, userInfo));
  } catch (exception) {
    yield put(signUpWithEmailAndPasswordFailed(action.operationId, exception.message));
  }
}

export function* watchSignUpWithEmailAndPassword() {
  yield takeLatest(USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD, signUpWithEmailAndPasswordAsync);
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
    yield call(helper.updateUserPublicProfile, action.publicProfileDetails);
    yield put(updateUserPublicProfileSucceeded(action.operationId));
  } catch (exception) {
    yield put(updateUserPublicProfileFailed(action.operationId, exception.message));
  }
}

export function* watchUpdateUserPublicProfile() {
  yield takeLatest(USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE, updateUserPublicProfileAsync);
}
