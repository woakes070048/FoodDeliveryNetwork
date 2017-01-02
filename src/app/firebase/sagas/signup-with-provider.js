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
} from '../actions';
import helper from '../helper';

function* signUpWithProviderAsync(action) {
  try {
    const response = yield call(helper.signUpWithProvider, action.providerName);

    yield put(signUpWithProviderSucceeded(action.operationId, response));
  } catch (exception) {
    yield put(signUpWithProviderFailed(action.operationId, exception.message));
  }
}

export default function* watchSignUpWithProvider() {
  yield takeLatest(FIREBASE_SIGNUP_WITH_PROVIDER, signUpWithProviderAsync);
}
