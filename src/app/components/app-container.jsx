import React, {
  PropTypes,
} from 'react';
import AppPresentation from './app-presentation';

const AppContainer = props =>
    <AppPresentation children={props.children} />;

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
