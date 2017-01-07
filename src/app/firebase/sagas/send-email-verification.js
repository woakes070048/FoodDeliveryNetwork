/* jshint esversion: 6 */

import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    FIREBASE_SEND_EMAIL_VERIFICATION,
} from '../action-types';
import {
    sendEmailVerificationSucceeded,
    sendEmailVerificationFailed,
} from '../actions';
import helper from '../helper';

function* sendEmailVerificationAsync(action) {
  try {
    yield call(helper.sendEmailVerification);
    yield put(sendEmailVerificationSucceeded(action.operationId));
  } catch (exception) {
    yield put(sendEmailVerificationFailed(action.operationId, exception.message));
  }
}

export default function* watchSendEmailVerification() {
  yield takeLatest(FIREBASE_SEND_EMAIL_VERIFICATION, sendEmailVerificationAsync);
}