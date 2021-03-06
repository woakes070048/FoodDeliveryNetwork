/* jshint esversion: 6 */

import firebase from 'firebase';
import config from './config';

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();

const firebaseHelper = {
  getProvider: (provider) => {
    switch (provider) {
    case 'email':
      return new firebase.auth.EmailAuthProvider();

    case 'facebook':
      return new firebase.auth.FacebookAuthProvider();

    case 'github':
      return new firebase.auth.GithubAuthProvider();

    case 'google':
      return new firebase.auth.GoogleAuthProvider();

    case 'twitter':
      return new firebase.auth.TwitterAuthProvider();

    default:
      throw new Error('Provider is not supported!!!');
    }
  },

  signUpWithEmailAndPassword: (emailAddress, password) =>
    firebaseAuth.createUserWithEmailAndPassword(emailAddress, password),

  signInWithEmailAndPassword: (emailAddress, password) =>
    firebaseAuth.signInWithEmailAndPassword(emailAddress, password),

  signUpWithProvider: (providerName) => {
    const provider = firebaseHelper.getProvider(providerName);

    return firebaseAuth.signInWithPopup(provider);
  },

  signInWithProvider: (providerName) => {
    const provider = firebaseHelper.getProvider(providerName);

    return firebaseAuth.signInWithPopup(provider);
  },

  signOut: () => firebaseAuth.signOut(),

  sendEmailVerification: () => firebaseAuth.currentUser.sendEmailVerification(),

  resetPassword: emailAddress => firebaseAuth.sendPasswordResetEmail(emailAddress),

  updateUserPublicProfile: displayName => firebaseAuth.currentUser.updateProfile({
    displayName,
  }),

  updatePassword: newPassword => firebaseAuth.currentUser.updatePassword(newPassword),

  fetchUser: () => new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  }),
};

export default firebaseHelper;
