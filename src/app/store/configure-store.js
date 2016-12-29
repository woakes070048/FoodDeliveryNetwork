/* jshint esversion: 6 */

import 'babel-polyfill';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../saga/sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(
    rootReducer,
    initialState,
    middleware);

  sagaMiddleware.run(sagas);

  return store;
}
