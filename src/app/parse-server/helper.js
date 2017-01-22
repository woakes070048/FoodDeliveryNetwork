/* jshint esversion: 6 */

import parse from 'parse';
import config from './config';
import Person from './schema/person';
import User from './schema/user';

parse.initialize(config.applicationId, config.javascriptKey);
parse.serverURL = config.serverUrl;

function getCurrentUser() {
  return new User(parse.User.current());
}

function getCurrentPerson() {
  return getCurrentUser()
    .getPerson();
}

function getCurrentPersonId() {
  return getCurrentPerson()
    .getId();
}

const parseServerHelper = {
  fetchUser: () => new Promise((resolve) => {
    resolve(parse.User.current());
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

  updateUserPublicProfile: ({
      salutation,
      firstName,
      middleName,
      lastName,
      preferredName,
      phone,
      mobile,
    }) =>
    User.saveUser({
      personName: {
        salutation,
        firstName,
        middleName,
        lastName,
        preferredName,
      },
      contactDetails: {
        phone,
        mobile,
      },
    }, parse.User.current()),

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

  getLoggedInPersonName: () => Person.loadPerson(getCurrentPersonId(), {
    loadName: true,
  }),

  getLoggedInPersonContactDetails: () => Person.loadPerson(getCurrentPersonId(), {
    loadContactDetails: true,
  }),

  getLoggedInPersonUserPublicProfileDetails: () => Person.loadPerson(getCurrentPersonId(), {
    loadName: true,
    loadContactDetails: true,
  }),

};

export default parseServerHelper;
