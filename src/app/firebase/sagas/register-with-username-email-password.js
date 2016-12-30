/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
} from '../action-types';
import {
  registerWithUsernameOrEmailAndPasswordSucceeded,
  registerWithUsernameOrEmailAndPasswordFailed,
} from '../actions.js';
import helper from '../helper';

function* registerWithUsernameOrEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.registerWithUsernameOrEmailAndPassword,
      action.usernameOrEmail, action.password);

    yield put(registerWithUsernameOrEmailAndPasswordSucceeded(response));
  } catch (exception) {
    yield put(registerWithUsernameOrEmailAndPasswordFailed(exception.message));
  }
}

export default function* watchRegisterWithUsernameOrEmailAndPassword() {
  yield takeLatest(FIREBASE_REGISTER_WITH_USERNAME_OR_EMAIL_AND_PASSWORD,
    registerWithUsernameOrEmailAndPasswordAsync);
}
