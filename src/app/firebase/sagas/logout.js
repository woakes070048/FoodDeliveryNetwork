/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_LOGOUT,
} from '../action-types';
import {
  logoutSucceeded,
  logoutFailed,
} from '../actions';
import helper from '../helper';

function* logoutAsync(action) {
  try {
    yield call(helper.logout);
    yield put(logoutSucceeded(action.operationId));
  } catch (exception) {
    yield put(logoutFailed(action.operationId, exception.message));
  }
}

export default function* watchLogout() {
  yield takeLatest(FIREBASE_LOGOUT, logoutAsync);
}
