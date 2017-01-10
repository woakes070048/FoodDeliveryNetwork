/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_UPDATE_PASSWORD,
} from '../action-types';
import {
  updatePasswordSucceeded,
  updatePasswordFailed,
} from '../actions';
import helper from '../helper';

function* updatePasswordAsync(action) {
  try {
    yield call(helper.updatePassword, action.newPassword);
    yield put(updatePasswordSucceeded(action.operationId));
  } catch (exception) {
    yield put(updatePasswordFailed(action.operationId, exception.message));
  }
}

export default function* watchUpdatePassword() {
  yield takeLatest(USER_ACCESS_UPDATE_PASSWORD, updatePasswordAsync);
}
