/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_SIGNIN_WITH_PROVIDER,
} from '../action-types';
import {
  signInWithProviderSucceeded,
  signInWithProviderFailed,
} from '../actions';
import helper from '../helper';

function* signInWithProviderAsync(action) {
  try {
    const response = yield call(helper.signInWithProvider, action.providerName);

    yield put(signInWithProviderSucceeded(response));
  } catch (exception) {
    yield put(signInWithProviderFailed(exception.message));
  }
}

export default function* watchSignInWithProvider() {
  yield takeLatest(FIREBASE_SIGNIN_WITH_PROVIDER, signInWithProviderAsync);
}
