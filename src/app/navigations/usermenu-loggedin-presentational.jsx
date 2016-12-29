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
  }) =>
    <Nav pullRight>
      <NavDropdown title={userDisplayName}>
        <MenuItem> Logout </MenuItem>
      </NavDropdown>
      <Image src={userPhotoUrl} responsive />
    </Nav>;

UserMenuLoggedInPresentational.propTypes = {
  userDisplayName: PropTypes.string,
  userPhotoUrl: PropTypes.string,
};

export default UserMenuLoggedInPresentational;
