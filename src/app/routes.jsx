import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';
import AppContainer from './components/app-container';
import HomeContainer from './components/home/home-container';
import UserLoginContainer from './components/user-login/user-login-container';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="/login" component={UserLoginContainer} />
    </Route>
);
