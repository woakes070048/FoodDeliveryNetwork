/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD,
} from '../action-types';
import {
  signUpWithEmailAndPasswordSucceeded,
  signUpWithEmailAndPasswordFailed,
} from '../actions';
import helper from '../helper';

function* signUpWithEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.signUpWithEmailAndPassword, action.emailAddress, action.password);

    yield put(signUpWithEmailAndPasswordSucceeded(action.operationId, response));
  } catch (exception) {
    yield put(signUpWithEmailAndPasswordFailed(action.operationId, exception.message));
  }
}

export default function* watchSignUpWithEmailAndPassword() {
  yield takeLatest(USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD, signUpWithEmailAndPasswordAsync);
}
