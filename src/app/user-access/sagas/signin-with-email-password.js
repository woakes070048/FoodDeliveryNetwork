/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD,
} from '../action-types';
import {
  signInWithEmailAndPasswordSucceeded,
  signInWithEmailAndPasswordFailed,
} from '../actions';
import helper from '../helper';

function* signInWithEmailAndPasswordAsync(action) {
  try {
    const response = yield call(helper.signInWithEmailAndPassword, action.emailAddress, action.password);

    yield put(signInWithEmailAndPasswordSucceeded(action.operationId, response));
  } catch (exception) {
    yield put(signInWithEmailAndPasswordFailed(action.operationId, exception.message));
  }
}

export default function* watchSignInWithEmailAndPassword() {
  yield takeLatest(USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPasswordAsync);
}
