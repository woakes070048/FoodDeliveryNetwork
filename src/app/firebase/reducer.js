/* jshint esversion: 6 */

import {
  FIREBASE_FETCH_USER_SUCCEEDED,
  FIREBASE_FETCH_USER_FAILED,
  FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNUP_WITH_PROVIDER_FAILED,
  FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED,
  FIREBASE_SIGNIN_WITH_PROVIDER_FAILED,
  FIREBASE_LOGOUT_SUCCEEDED,
  FIREBASE_LOGOUT_FAILED,
} from './action-types';

import initialState from '../store/initial-state';

function addSucceededOperationToState(state, operationId) {
  const newOperation = {
    operationId,
    failed: false,
  };
  const operations = [...state.operations, Object.assign({}, newOperation)];

  return Object.assign({}, state, {
    operations,
  });
}

function createStateWithUserInfo(state, userInfo) {
  return Object.assign({}, state, {
    userInfo: {
      userExists: true,
      error: null,
      userId: userInfo.userId,
      email: userInfo.email,
      displayName: userInfo.displayName,
      photoUrl: userInfo.photoUrl,
    },
  });
}

function createStateWithoutUserInfo(state, error = null) {
  return Object.assign({}, state, {
    userInfo: {
      userExists: false,
      error,
    },
  });
}

function handleFetchUserSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignUpWithProviderSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignInWithProviderSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

export default function (state = initialState.firebaseContext, action) {
  switch (action.type) {
  case FIREBASE_FETCH_USER_SUCCEEDED:
    return handleFetchUserSucceeded(state, action);

  case FIREBASE_FETCH_USER_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  case FIREBASE_SIGNUP_WITH_PROVIDER_SUCCEEDED:
    return handleSignUpWithProviderSucceeded(state, action);

  case FIREBASE_SIGNUP_WITH_PROVIDER_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  case FIREBASE_SIGNIN_WITH_PROVIDER_SUCCEEDED:
    return handleSignInWithProviderSucceeded(state, action);

  case FIREBASE_SIGNIN_WITH_PROVIDER_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  case FIREBASE_LOGOUT_SUCCEEDED:
    return createStateWithoutUserInfo(state);

  case FIREBASE_LOGOUT_FAILED:
    return createStateWithoutUserInfo(state, action.error);

  default:
    return state;
  }
}
