/* jshint esversion: 6 */

import {
  combineReducers,
} from 'redux';
import firebaseReducer from './firebase/reducer';

export default combineReducers({
  firebase: firebaseReducer,
});
