/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_ACCESS_SIGNIN_WITH_PROVIDER,
} from '../action-types';
import {
  signInWithProviderSucceeded,
  signInWithProviderFailed,
} from '../actions';
import helper from '../../firebase/helper';

function* signInWithProviderAsync(action) {
  try {
    const response = yield call(helper.signInWithProvider, action.providerName);

    yield put(signInWithProviderSucceeded(action.operationId, response));
  } catch (exception) {
    yield put(signInWithProviderFailed(action.operationId, exception.message));
  }
}

export default function* watchSignInWithProvider() {
  yield takeLatest(USER_ACCESS_SIGNIN_WITH_PROVIDER, signInWithProviderAsync);
}
