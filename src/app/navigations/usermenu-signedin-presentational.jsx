import React, {
  PropTypes,
} from 'react';
import {
  MenuItem,
  Nav,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import {
  LinkContainer,
} from 'react-router-bootstrap';

function formatUserInfoToDisplay(userDisplayName, userEmailAddress) {
  if (userEmailAddress) {
    return (
      <div>
      Signed in as
      <br />
        <strong>
          {userDisplayName} ({userEmailAddress})
      </strong>
      </div>
    );
  }

  return (
    <div>
      Signed in as
      <br />
      <strong>
        {userDisplayName}
      </strong>
    </div>
  );
}

const UserMenuSignedInPresentational = ({
    userDisplayName,
    userEmailAddress,
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
        <MenuItem disabled>
          {formatUserInfoToDisplay(userDisplayName, userEmailAddress)}
        </MenuItem>
        <MenuItem divider />
        <LinkContainer to="/profile" >
          <MenuItem> My profile </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem onClick={() => onSignOutMenuItemClicked()}> Sign out </MenuItem>
      </NavDropdown>
    </Nav>;

UserMenuSignedInPresentational.propTypes = {
  userDisplayName: PropTypes.string,
  userEmailAddress: PropTypes.string,
  userPhotoUrl: PropTypes.string,
  onSignOutMenuItemClicked: PropTypes.func.isRequired,
};

export default UserMenuSignedInPresentational;
