/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
} from '../action-types';
import {
  signInWithUsernameOrEmailAndPasswordSucceeded,
  signInWithUsernameOrEmailAndPasswordFailed,
} from '../actions';
import helper from '../helper';

function* signInWithUsernameOrEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.signInWithUsernameOrEmailAndPassword,
      action.usernameOrEmail, action.password);

    yield put(signInWithUsernameOrEmailAndPasswordSucceeded(response));
  } catch (exception) {
    yield put(signInWithUsernameOrEmailAndPasswordFailed(exception.message));
  }
}

export default function* watchSignInWithUsernameOrEmailAndPassword() {
  yield takeLatest(FIREBASE_SIGNIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    signInWithUsernameOrEmailAndPasswordAsync);
}
