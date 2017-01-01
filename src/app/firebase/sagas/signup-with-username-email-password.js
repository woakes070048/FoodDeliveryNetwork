/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
} from '../action-types';
import {
  signUpWithUsernameOrEmailAndPasswordSucceeded,
  signUpWithUsernameOrEmailAndPasswordFailed,
} from '../actions';
import helper from '../helper';

function* signUpWithUsernameOrEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.signUpWithUsernameOrEmailAndPassword,
      action.usernameOrEmail, action.password);

    yield put(signUpWithUsernameOrEmailAndPasswordSucceeded(response));
  } catch (exception) {
    yield put(signUpWithUsernameOrEmailAndPasswordFailed(exception.message));
  }
}

export default function* watchSignUpWithUsernameOrEmailAndPassword() {
  yield takeLatest(FIREBASE_SIGNUP_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    signUpWithUsernameOrEmailAndPasswordAsync);
}
