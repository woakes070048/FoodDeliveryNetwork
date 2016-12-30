import React, {
  PropTypes,
} from 'react';
import {
  MenuItem,
  Nav,
  NavDropdown,
  Image,
} from 'react-bootstrap';

const UserMenuLoggedInPresentational = ({
    userDisplayName,
    userPhotoUrl,
    onLogoutMenuItemClicked,
  }) =>
    <Nav pullRight>
      <NavDropdown title={userDisplayName}>
        <MenuItem onClick={() => onLogoutMenuItemClicked()}> Logout </MenuItem>
      </NavDropdown>
      <Image
        src={userPhotoUrl}
        className="navbar-user-photo"
        circle
      />
    </Nav>;

UserMenuLoggedInPresentational.propTypes = {
  userDisplayName: PropTypes.string,
  userPhotoUrl: PropTypes.string,
  onLogoutMenuItemClicked: PropTypes.func.isRequired,
};

export default UserMenuLoggedInPresentational;
