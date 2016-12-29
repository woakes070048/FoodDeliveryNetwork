/* jshint esversion: 6 */

import WatchFetchUser from '../firebase/fetchuser-saga';

export default function* sagas() {
  yield [WatchFetchUser()];
}
