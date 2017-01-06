/* jshint esversion: 6 */

import {
  NOTIFICATION_ADDED,
  NOTIFICATION_ADD_ERROR,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_ADD_WARNING,
} from './action-types';
import initialState from '../store/initial-state';

function handleAdded(state, action) {
  return [...state.filter(notification => notification.notificationId !== action.notificationId)];
}

function handleAddError(state, action) {
  return [...state, Object.assign({}, {
    notificationId: action.notificationId,
    message: action.message,
    level: 'error',
    position: 'br',
  })];
}

function handleAddSuccess(state, action) {
  return [...state, Object.assign({}, {
    notificationId: action.notificationId,
    message: action.message,
    level: 'success',
    position: 'br',
  })];
}

function handleAddWarning(state, action) {
  return [...state, Object.assign({}, {
    notificationId: action.notificationId,
    message: action.message,
    level: 'warning',
    position: 'br',
  })];
}

export default function (state = initialState.notificationContext, action) {
  switch (action.type) {
  case NOTIFICATION_ADDED:
    return handleAdded(state, action);

  case NOTIFICATION_ADD_ERROR:
    return handleAddError(state, action);

  case NOTIFICATION_ADD_SUCCESS:
    return handleAddSuccess(state, action);

  case NOTIFICATION_ADD_WARNING:
    return handleAddWarning(state, action);

  default:
    return state;
  }
}
