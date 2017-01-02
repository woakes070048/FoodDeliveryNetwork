/* jshint esversion: 6 */

import {
  NOTIFICATION_ADDED,
  NOTIFICATION_ADD_ERROR,
} from './action-types';
import initialState from '../store/initial-state';

function handleAdded(state, action) {
  return [...state.filter(notification => notification.notificationId !== action.notificationId)];
}

function handleAddError(state, action) {
  return [...state, Object.assign({}, {
    notificationId: action.notificationId,
    message: action.errorMessage,
    level: 'error',
    position: 'br',
  })];
}

export default function (state = initialState.notificationContext, action) {
  switch (action.type) {
  case NOTIFICATION_ADDED:
    return handleAdded(state, action);

  case NOTIFICATION_ADD_ERROR:
    return handleAddError(state, action);

  default:
    return state;
  }
}
