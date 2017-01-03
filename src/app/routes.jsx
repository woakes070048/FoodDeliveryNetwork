import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';
import AppContainer from './app-container';
import HomeContainer from './home/home-container';
import UserProfileContainer from './user-profile/user-profile-container';
import UserSignInContainer from './user-signin/user-signin-container';
import UserSignUpContainer from './user-signup/user-signup-container';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer} />
    <Route path="/profile" component={UserProfileContainer} />
    <Route path="/signin" component={UserSignInContainer} />
    <Route path="/signup" component={UserSignUpContainer} />
  </Route>
);
