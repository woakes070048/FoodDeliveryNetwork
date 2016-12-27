/* jshint esversion: 6 */

import {
  createStore,
  applyMiddleware,
} from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import RootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    RootReducer,
    initialState,
    process.env.NODE_ENV === 'production' ?
    applyMiddleware(
      ReduxPromise) : applyMiddleware(ReduxPromise,
      ReduxImmutableStateInvariant()));
}
