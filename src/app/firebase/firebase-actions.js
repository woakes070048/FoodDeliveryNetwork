/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER,
  FIREBASE_REGISTER_WITH_EMAIL_PASSWORD,
  FIREBASE_LOGIN_WITH_EMAIL_PASSWORD,
  FIREBASE_LOGIN_WITH_PROVIDER,
} from './firebase-action-types';

export function fetchUser() {
  return {
    type: FIREBASE_FETCH_USER,
  };
}

export function registerWithEmailPassword(email, password) {
  return {
    type: FIREBASE_REGISTER_WITH_EMAIL_PASSWORD,
    email,
    password,
  };
}

export function loginWithEmailPassword(email, password) {
  return {
    type: FIREBASE_LOGIN_WITH_EMAIL_PASSWORD,
    email,
    password,
  };
}

export function loginWithProvider(provider) {
  return {
    type: FIREBASE_LOGIN_WITH_PROVIDER,
    provider,
  };
}
