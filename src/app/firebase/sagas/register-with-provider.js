/* jshint esversion: 6 */

import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  FIREBASE_REGISTER_WITH_PROVIDER,
} from '../action-types';
import {
  registerWithProviderSucceeded,
  registerWithProviderFailed,
} from '../actions.js';
import helper from '../helper';

function* registerWithProviderAsync(provider) {
  try {
    const response = yield call(helper.loginWithProvider, provider);

    yield put(registerWithProviderSucceeded(response));
  } catch (exception) {
    yield put(registerWithProviderFailed(exception.message));
  }
}

export default function* watchRegisterWithProvider() {
  yield takeEvery(FIREBASE_REGISTER_WITH_PROVIDER, registerWithProviderAsync);
}
