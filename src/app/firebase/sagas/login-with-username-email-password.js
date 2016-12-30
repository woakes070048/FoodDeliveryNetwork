/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
} from '../action-types';
import {
  loginWithUsernameOrEmailAndPasswordSucceeded,
  loginWithUsernameOrEmailAndPasswordFailed,
} from '../actions.js';
import helper from '../helper';

function* loginWithUsernameOrEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.loginWithUsernameOrEmailAndPassword,
      action.usernameOrEmail, action.password);

    yield put(loginWithUsernameOrEmailAndPasswordSucceeded(response));
  } catch (exception) {
    yield put(loginWithUsernameOrEmailAndPasswordFailed(exception.message));
  }
}

export default function* watchLoginWithUsernameOrEmailAndPassword() {
  yield takeLatest(FIREBASE_LOGIN_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    loginWithUsernameOrEmailAndPasswordAsync);
}
