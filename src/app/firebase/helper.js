/* jshint esversion: 6 */

import firebase from 'firebase';
import config from './config';

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const firebaseDatabase = firebaseApp.database();

const firebaseHelper = {
  /**
   * Return an instance of a firebase auth provider based on the provider string.
   *
   * @param provider
   * @returns {firebase.auth.AuthProvider}
   */
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

  /**
   * Login with provider => p is provider "email", "facebook", "github", "google", or "twitter"
   * Uses Popup therefore provider must be an OAuth provider. EmailAuthProvider will throw an error
   *
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginWithProvider: (providerName) => {
    const provider = firebaseHelper.getProvider(providerName);
    return firebaseAuth.signInWithPopup(provider)
      .then(firebaseAuth.currentUser)
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message,
      }));
  },

  /**
   * Retrieve the current user (Promise)
   *
   * @returns {Promise}
   */
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
