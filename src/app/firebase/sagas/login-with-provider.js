/* jshint esversion: 6 */

import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  FIREBASE_LOGIN_WITH_PROVIDER,
} from '../action-types';
import {
  loginWithProviderSucceeded,
  loginWithProviderFailed,
} from '../actions.js';
import helper from '../helper';

function* loginWithProviderAsync(action) {
  try {
    const response = yield call(helper.loginWithProvider, action.providerName);

    yield put(loginWithProviderSucceeded(response));
  } catch (exception) {
    yield put(loginWithProviderFailed(exception.message));
  }
}

export default function* watchLoginWithProvider() {
  yield takeEvery(FIREBASE_LOGIN_WITH_PROVIDER, loginWithProviderAsync);
}
