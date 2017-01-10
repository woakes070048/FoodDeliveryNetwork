/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_SIGNOUT,
} from '../action-types';
import {
  signOutSucceeded,
  signOutFailed,
} from '../actions';
import helper from '../../firebase/helper';

function* signOutAsync(action) {
  try {
    yield call(helper.signOut);
    yield put(signOutSucceeded(action.operationId));
  } catch (exception) {
    yield put(signOutFailed(action.operationId, exception.message));
  }
}

export default function* watchSignOut() {
  yield takeLatest(USER_ACCESS_SIGNOUT, signOutAsync);
}
