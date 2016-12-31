import React, {
  PropTypes,
} from 'react';
import {
  MenuItem,
  Nav,
  NavDropdown,
  Image,
} from 'react-bootstrap';

const UserMenuSignedInPresentational = ({
    userDisplayName,
    userPhotoUrl,
    onSignOutMenuItemClicked,
  }) =>
    <Nav pullRight>
      <NavDropdown
        title={
          <Image
            src={userPhotoUrl}
            className="navbar-user-photo"
            rounded
          />}
      >
        <MenuItem onClick={() => onSignOutMenuItemClicked()}> Sign out </MenuItem>
      </NavDropdown>
    </Nav>;

UserMenuSignedInPresentational.propTypes = {
  userDisplayName: PropTypes.string,
  userPhotoUrl: PropTypes.string,
  onSignOutMenuItemClicked: PropTypes.func.isRequired,
};

export default UserMenuSignedInPresentational;
