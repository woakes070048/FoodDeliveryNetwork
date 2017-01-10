/* jshint esversion: 6 */

import {
  combineReducers,
} from 'redux';
import userAccessReducer from './user-access/reducer';
import loadingReducer from './loading/reducer';
import notificationReducer from './notification/reducer';

export default combineReducers({
  userAccess: userAccessReducer,
  loading: loadingReducer,
  notification: notificationReducer,
});
