/* jshint esversion: 6 */

import shortid from 'shortid';
import {
  NOTIFICATION_ADDED,
  NOTIFICATION_ADD_ERROR,
} from './action-types';

export function added(notificationId) {
  return {
    type: NOTIFICATION_ADDED,
    notificationId,
  };
}

export function addError(errorMessage) {
  return {
    type: NOTIFICATION_ADD_ERROR,
    notificationId: shortid.generate(),
    errorMessage,
  };
}
