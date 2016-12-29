/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_FETCH_USER,
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
} from '../action-types';
import {
  fetchUserSucceeded,
  fetchUserFailed,
} from '../actions.js';
import helper from '../helper';

function* fetchUserAsync() {
  try {
    const response = yield call(helper.fetchUser);

    yield put(fetchUserSucceeded(response));
  } catch (exception) {
    yield put(fetchUserFailed(exception.message));
  }
}

export default function* watchFetchUser() {
  yield takeLatest(FIREBASE_FETCH_USER, fetchUserAsync);
}
