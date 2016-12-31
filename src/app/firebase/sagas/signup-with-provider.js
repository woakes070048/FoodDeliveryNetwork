/* jshint esversion: 6 */

import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  FIREBASE_SIGNUP_WITH_PROVIDER,
} from '../action-types';
import {
  signUpWithProviderSucceeded,
  signUpWithProviderFailed,
} from '../actions.js';
import helper from '../helper';

function* signUpWithProviderAsync(action) {
  try {
    const response = yield call(helper.signUpWithProvider, action.providerName);

    yield put(signUpWithProviderSucceeded(response));
  } catch (exception) {
    yield put(signUpWithProviderFailed(exception.message));
  }
}

export default function* watchSignUpWithProvider() {
  yield takeLatest(FIREBASE_SIGNUP_WITH_PROVIDER, signUpWithProviderAsync);
}
