/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_FETCH_USER,
} from '../action-types';
import {
  fetchUserSucceeded,
  fetchUserFailed,
} from '../actions';
import helper from '../helper';

function* fetchUserAsync(action) {
  try {
    const response = yield call(helper.fetchUser);

    yield put(fetchUserSucceeded(action.operationId, response));
  } catch (exception) {
    yield put(fetchUserFailed(action.operationId, exception.message));
  }
}

export default function* watchFetchUser() {
  yield takeLatest(USER_ACCESS_FETCH_USER, fetchUserAsync);
}
