import React, {
  PropTypes,
} from 'react';
import NavbarPresentational from './navigations/navbar-presentational';

const AppPresentational = ({
    children,
  }) =>
    <div>
      <NavbarPresentational />
      <div className="container-fluid">
        {children}
      </div>
    </div>;

AppPresentational.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppPresentational;
