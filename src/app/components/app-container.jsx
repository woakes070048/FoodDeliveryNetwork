import React, {
  PropTypes,
} from 'react';
import AppPresentation from './app-presentation';

const AppContainer = props =>
  <AppPresentation >
            {props.children}
        </AppPresentation>;

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
