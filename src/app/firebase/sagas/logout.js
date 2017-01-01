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

function* logoutAsync() {
  try {
    yield call(helper.logout);
    yield put(logoutSucceeded());
  } catch (exception) {
    yield put(logoutFailed(exception.message));
  }
}

export default function* watchLogout() {
  yield takeLatest(FIREBASE_LOGOUT, logoutAsync);
}
