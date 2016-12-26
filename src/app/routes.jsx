import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';
import AppContainer from './components/app-container';
import HomeContainer from './components/home/home-container';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer} />
  </Route>
);
