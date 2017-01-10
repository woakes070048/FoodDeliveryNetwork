/* jshint esversion: 6 */

import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    USER_ACCESS_RESET_PASSWORD,
} from '../action-types';
import {
    resetPasswordSucceeded,
    resetPasswordFailed,
} from '../actions';
import helper from '../../firebase/helper';

function* resetPasswordAsync(action) {
  try {
    yield call(helper.resetPassword, action.emailAddress);
    yield put(resetPasswordSucceeded(action.operationId));
  } catch (exception) {
    yield put(resetPasswordFailed(action.operationId, exception.message));
  }
}

export default function* watchResetPassword() {
  yield takeLatest(USER_ACCESS_RESET_PASSWORD, resetPasswordAsync);
}
