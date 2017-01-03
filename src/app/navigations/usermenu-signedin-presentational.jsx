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

function getUserDisplayName(userDisplayName) {
  return userDisplayName || 'Unknown';
}

function formatUserInfoToDisplay(userDisplayName, userEmailAddress) {
  return userEmailAddress ?
    (
      <div>
      Signed in as
      <br />
        <strong>
          {getUserDisplayName(userDisplayName)} ({userEmailAddress})
      </strong>
      </div>
    ) :
    (
      <div>
      Signed in as
      <br />
        <strong>
          {getUserDisplayName(userDisplayName)}
        </strong>
      </div>
    );
}

function getUserImageOrDisplayName(userDisplayName, userPhotoUrl) {
  return userPhotoUrl ?
    (
      <Image
        src={userPhotoUrl}
        className="navbar-user-photo"
        rounded
      />
    ) :
    (<span>{getUserDisplayName(userDisplayName)}</span>);
}

const UserMenuSignedInPresentational = ({
    userDisplayName,
    userEmailAddress,
    userPhotoUrl,
    onSignOutMenuItemClicked,
  }) =>
    <Nav collapseOnSelect pullRight>
      <NavDropdown title={getUserImageOrDisplayName(userDisplayName, userPhotoUrl)} >
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
