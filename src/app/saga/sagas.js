/* jshint esversion: 6 */

import WatchFetchUser from '../firebase/sagas/fetch-user';

export default function* sagas() {
  yield [WatchFetchUser()];
}
