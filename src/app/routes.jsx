import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';
import AppContainer from './app-container';
import HomeContainer from './home/home-container';
import UserLoginContainer from './user-login/user-login-container';
import UserRegisterContainer from './user-register/user-register-container';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer} />
    <Route path="/login" component={UserLoginContainer} />
    <Route path="/register" component={UserRegisterContainer} />
  </Route>
);
