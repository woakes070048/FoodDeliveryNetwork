import React, {
  PropTypes,
} from 'react';
import AppPresentational from './app-presentational';

const AppContainer = props =>
  <AppPresentational children={props.children} />;

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
