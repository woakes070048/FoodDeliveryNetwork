/* jshint esversion: 6 */

import shortid from 'shortid';
import {
  NOTIFICATION_ADDED,
  NOTIFICATION_ADD_ERROR,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_ADD_WARNING,
} from './action-types';

export function added(notificationId) {
  return {
    type: NOTIFICATION_ADDED,
    notificationId,
  };
}

export function addError(message) {
  return {
    type: NOTIFICATION_ADD_ERROR,
    notificationId: shortid.generate(),
    message,
  };
}

export function addSuccess(message) {
  return {
    type: NOTIFICATION_ADD_SUCCESS,
    notificationId: shortid.generate(),
    message,
  };
}

export function addWarning(message) {
  return {
    type: NOTIFICATION_ADD_WARNING,
    notificationId: shortid.generate(),
    message,
  };
}
