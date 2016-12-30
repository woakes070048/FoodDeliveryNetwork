/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_REGISTER_WITH_PROVIDER,
} from '../action-types';
import {
  registerWithProviderSucceeded,
  registerWithProviderFailed,
} from '../actions.js';
import helper from '../helper';

function* registerWithProviderAsync(action) {
  try {
    const response = yield call(helper.loginWithProvider, action.providerName);

    yield put(registerWithProviderSucceeded(response));
  } catch (exception) {
    yield put(registerWithProviderFailed(exception.message));
  }
}

export default function* watchRegisterWithProvider() {
  yield takeLatest(FIREBASE_REGISTER_WITH_PROVIDER, registerWithProviderAsync);
}
