/* jshint esversion: 6 */

import {
  LOADING_START_MAIN,
  LOADING_START_TRANSPARENT,
  LOADING_STOP,
} from './action-types';

export function startMain() {
  return {
    type: LOADING_START_MAIN,
  };
}

export function startTransparent() {
  return {
    type: LOADING_START_TRANSPARENT,
  };
}

export function stop() {
  return {
    type: LOADING_STOP,
  };
}
