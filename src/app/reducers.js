/* jshint esversion: 6 */

import {
  combineReducers,
} from 'redux';
import firebaseReducer from './firebase/reducer';
import notificationReducer from './notification/reducer';

export default combineReducers({
  firebase: firebaseReducer,
  notification: notificationReducer,
});
