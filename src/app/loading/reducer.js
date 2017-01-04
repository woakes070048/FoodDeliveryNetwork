/* jshint esversion: 6 */

import {
  LOADING_START_MAIN,
  LOADING_START_TRANSPARENT,
  LOADING_STOP,
} from './action-types';
import initialState from '../store/initial-state';

export default function (state = initialState.loadingContext, action) {
  switch (action.type) {
  case LOADING_START_MAIN:
    return 'main';

  case LOADING_START_TRANSPARENT:
    return 'transparent';

  case LOADING_STOP:
    return 'none';

  default:
    return state;
  }
}
