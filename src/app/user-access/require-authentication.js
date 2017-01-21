/* jshint esversion: 6 */

import helper from '../parse-server/helper';

function redirectToSignInPage(nextState, replace) {
  replace({
    pathname: '/signin',
    state: {
      nextPathname: nextState.location.pathname,
    },
  });
}

export default function requireAuth(nextState, replace, callback) {
  helper.fetchUser()
    .then((userInfo) => {
      if (!userInfo || !userInfo.id) {
        redirectToSignInPage(nextState, replace);
      }

      callback();
    })
    .catch((error) => {
      callback(error);
    });
}
