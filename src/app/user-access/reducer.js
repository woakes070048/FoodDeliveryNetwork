/* jshint esversion: 6 */

import {
  USER_ACCESS_ACKNOWLEDGE_OPERATION,
  USER_ACCESS_FETCH_USER_SUCCEEDED,
  USER_ACCESS_FETCH_USER_FAILED,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
  USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_FAILED,
  USER_ACCESS_SIGNUP_WITH_PROVIDER_SUCCEEDED,
  USER_ACCESS_SIGNUP_WITH_PROVIDER_FAILED,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED,
  USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_FAILED,
  USER_ACCESS_SIGNIN_WITH_PROVIDER_SUCCEEDED,
  USER_ACCESS_SIGNIN_WITH_PROVIDER_FAILED,
  USER_ACCESS_SIGNOUT_SUCCEEDED,
  USER_ACCESS_SIGNOUT_FAILED,
  USER_ACCESS_RESET_PASSWORD_SUCCEEDED,
  USER_ACCESS_RESET_PASSWORD_FAILED,
  USER_ACCESS_UPDATE_PASSWORD_SUCCEEDED,
  USER_ACCESS_UPDATE_PASSWORD_FAILED,
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_SUCCEEDED,
  USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_FAILED,
  USER_ACCESS_SEND_EMAIL_VERIFICATION_SUCCEEDED,
  USER_ACCESS_SEND_EMAIL_VERIFICATION_FAILED,
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

function addFailedOperationToState(state, operationId, error) {
  const newOperation = {
    operationId,
    failed: true,
    errorMessage: error,
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
      userId: userInfo.userId,
      emailAddress: userInfo.emailAddress,
      emailAddressVerified: userInfo.emailAddressVerified,
      displayName: userInfo.displayName,
      photoUrl: userInfo.photoUrl,
    },
  });
}

function createStateWithoutUserInfo(state) {
  return Object.assign({}, state, {
    userInfo: {
      userExists: false,
    },
  });
}

function handleAcknowledgeOperation(state, action) {
  return Object.assign({}, state, {
    operations: [...state.operations.filter(operation => operation.operationId !== action.operationId)],
  });
}

function handleFetchUserSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleFetchUserFailed(state, action) {
  const stateWithOperationInfo = addFailedOperationToState(state, action.operationId, action.error);

  return createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignUpWithEmailAndPasswordSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignUpWithEmailAndPasswordFailed(state, action) {
  const stateWithOperationInfo = addFailedOperationToState(state, action.operationId, action.error);

  return createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignUpWithProviderSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignUpWithProviderFailed(state, action) {
  const stateWithOperationInfo = addFailedOperationToState(state, action.operationId, action.error);

  return createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignInWithEmailAndPasswordSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignInWithEmailAndPasswordFailed(state, action) {
  const stateWithOperationInfo = addFailedOperationToState(state, action.operationId, action.error);

  return createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignInWithProviderSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return action.userInfo.userFetched ? createStateWithUserInfo(stateWithOperationInfo, action.userInfo) :
    createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignInWithProviderFailed(state, action) {
  const stateWithOperationInfo = addFailedOperationToState(state, action.operationId, action.error);

  return createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignOutSucceeded(state, action) {
  const stateWithOperationInfo = addSucceededOperationToState(state, action.operationId);

  return createStateWithoutUserInfo(stateWithOperationInfo);
}

function handleSignOutFailed(state, action) {
  return addFailedOperationToState(state, action.operationId, action.error);
}

function handleResetPasswordSucceeded(state, action) {
  return addSucceededOperationToState(state, action.operationId);
}

function handleResetPasswordFailed(state, action) {
  return addFailedOperationToState(state, action.operationId, action.error);
}

function handleUpdatePasswordSucceeded(state, action) {
  return addSucceededOperationToState(state, action.operationId);
}

function handleUpdatePasswordFailed(state, action) {
  return addFailedOperationToState(state, action.operationId, action.error);
}

function handleUpdateUserPublicProfileSucceeded(state, action) {
  return addSucceededOperationToState(state, action.operationId);
}

function handleUpdateUserPublicProfileFailed(state, action) {
  return addFailedOperationToState(state, action.operationId, action.error);
}

function handleSendEmailVerificationSucceeded(state, action) {
  return addSucceededOperationToState(state, action.operationId);
}

function handleSendEmailVerificationFailed(state, action) {
  return addFailedOperationToState(state, action.operationId, action.error);
}

export default function (state = initialState.userAccessContext, action) {
  switch (action.type) {
  case USER_ACCESS_ACKNOWLEDGE_OPERATION:
    return handleAcknowledgeOperation(state, action);

  case USER_ACCESS_FETCH_USER_SUCCEEDED:
    return handleFetchUserSucceeded(state, action);

  case USER_ACCESS_FETCH_USER_FAILED:
    return handleFetchUserFailed(state, action);

  case USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_SUCCEEDED:
    return handleSignUpWithEmailAndPasswordSucceeded(state, action);

  case USER_ACCESS_SIGNUP_WITH_EMAIL_AND_PASSWORD_FAILED:
    return handleSignUpWithEmailAndPasswordFailed(state, action);

  case USER_ACCESS_SIGNUP_WITH_PROVIDER_SUCCEEDED:
    return handleSignUpWithProviderSucceeded(state, action);

  case USER_ACCESS_SIGNUP_WITH_PROVIDER_FAILED:
    return handleSignUpWithProviderFailed(state, action);

  case USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_SUCCEEDED:
    return handleSignInWithEmailAndPasswordSucceeded(state, action);

  case USER_ACCESS_SIGNIN_WITH_EMAIL_AND_PASSWORD_FAILED:
    return handleSignInWithEmailAndPasswordFailed(state, action);

  case USER_ACCESS_SIGNIN_WITH_PROVIDER_SUCCEEDED:
    return handleSignInWithProviderSucceeded(state, action);

  case USER_ACCESS_SIGNIN_WITH_PROVIDER_FAILED:
    return handleSignInWithProviderFailed(state, action);

  case USER_ACCESS_SIGNOUT_SUCCEEDED:
    return handleSignOutSucceeded(state, action);

  case USER_ACCESS_SIGNOUT_FAILED:
    return handleSignOutFailed(state, action);

  case USER_ACCESS_RESET_PASSWORD_SUCCEEDED:
    return handleResetPasswordSucceeded(state, action);

  case USER_ACCESS_RESET_PASSWORD_FAILED:
    return handleResetPasswordFailed(state, action);

  case USER_ACCESS_UPDATE_PASSWORD_SUCCEEDED:
    return handleUpdatePasswordSucceeded(state, action);

  case USER_ACCESS_UPDATE_PASSWORD_FAILED:
    return handleUpdatePasswordFailed(state, action);

  case USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_SUCCEEDED:
    return handleUpdateUserPublicProfileSucceeded(state, action);

  case USER_ACCESS_UPDATE_USER_PUBLIC_PROFILE_FAILED:
    return handleUpdateUserPublicProfileFailed(state, action);

  case USER_ACCESS_SEND_EMAIL_VERIFICATION_SUCCEEDED:
    return handleSendEmailVerificationSucceeded(state, action);

  case USER_ACCESS_SEND_EMAIL_VERIFICATION_FAILED:
    return handleSendEmailVerificationFailed(state, action);

  default:
    return state;
  }
}
