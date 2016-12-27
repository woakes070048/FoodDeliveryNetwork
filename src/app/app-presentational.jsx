import React, {
  PropTypes,
} from 'react';
import NavbarPresentational from './navigations/navbar-presentational';

const AppPresentational = ({
    children,
  }) =>
    <div className="container-fluid">
      <NavbarPresentational />
      <div>
        {children}
      </div>
    </div>;

AppPresentational.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppPresentational;
