import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  browserHistory,
} from 'react-router';

/* import 'bootstrap-social';*/
import routes from './routes';
import './bundle.scss';

ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.querySelector('.root-view'));
