/* jshint esversion: 6 */

import parse from 'parse';
import config from './config';

parse.initialize(config.applicationId, config.javascriptKey);
parse.serverURL = config.serverUrl;

const parseServerHelper = {
  fetchUser: () => new Promise((resolve, reject) => {
    const currentUser = parse.User.current();

    if (currentUser) {
      currentUser.fetch()
        .then(response => resolve(response))
        .catch(error => reject(error));
    } else {
      resolve(currentUser);
    }
  }),

  signUpWithEmailAndPassword: (emailAddress, password) => {
    const user = new parse.User();

    user.set('username', emailAddress);
    user.set('password', password);
    user.set('email', emailAddress);
    return user.signUp();
  },

  signInWithEmailAndPassword: (emailAddress, password) =>
    parse.User.logIn(emailAddress, password),

  signOut: () => new Promise((resolve, reject) => {
    parse.User.logOut()
      .then(() =>
        resolve())
      .catch(error =>
        reject(error));
  }),

  updateUserPublicProfile: (displayName) => {
    const user = parse.User.current();

    user.set('displayName', displayName);

    return user.save();
  },

  sendEmailVerification: () => {
    const user = parse.User.current();

    // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
    user.set('email', user.getEmail());

    return user.save();
  },

  resetPassword: emailAddress => new Promise((resolve, reject) => {
    parse.User.requestPasswordReset(emailAddress)
      .then(() =>
        resolve())
      .catch(error =>
        reject(error));
  }),

  updatePassword: (newPassword) => {
    const user = parse.User.current();

    user.set('password', newPassword);

    return user.save();
  },

};

export default parseServerHelper;
