/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE,
} from '../action-types';
import {
  updateUserPublicProfileSucceeded,
  updateUserPublicProfileFailed,
} from '../actions';
import helper from '../../firebase/helper';

function* updateUserPublicProfileAsync(action) {
  try {
    yield call(helper.updateUserPublicProfile, action.displayName);
    yield put(updateUserPublicProfileSucceeded(action.operationId));
  } catch (exception) {
    yield put(updateUserPublicProfileFailed(action.operationId, exception.message));
  }
}

export default function* watchUpdateUserPublicProfile() {
  yield takeLatest(USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE, updateUserPublicProfileAsync);
}
