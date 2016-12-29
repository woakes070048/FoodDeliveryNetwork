/* jshint esversion: 6 */

import 'babel-polyfill';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';
import sagas from '../saga/sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV === 'production' ?
    applyMiddleware(
      sagaMiddleware) : applyMiddleware(sagaMiddleware,
      reduxImmutableStateInvariant()));

  sagaMiddleware.run(sagas);

  return store;
}
