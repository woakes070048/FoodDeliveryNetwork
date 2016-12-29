import React, {
  PropTypes,
} from 'react';
import NavbarContainer from './navigations/navbar-container';

const AppPresentational = ({
    children,
  }) =>
    <div>
      <NavbarContainer />
      <div className="container-fluid">
        {children}
      </div>
    </div>;

AppPresentational.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppPresentational;
