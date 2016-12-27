import React, {
  PropTypes,
} from 'react';
import NavbarPresentation from './navigations/navbar-presentation';

const AppPresentation = ({
    children,
  }) =>
      <div className="container-fluid">
          <NavbarPresentation />
          <div>
              {children}
          </div>
      </div>;

AppPresentation.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppPresentation;
