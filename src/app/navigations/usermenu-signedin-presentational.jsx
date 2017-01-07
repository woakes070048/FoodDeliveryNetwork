import React, {
  PropTypes,
} from 'react';
import {
  Image,
  MenuItem,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import {
  LinkContainer,
} from 'react-router-bootstrap';

function getUserDisplayName(userDisplayName) {
  return userDisplayName || 'Unknown';
}

function formatUserInfoToDisplay(userDisplayName, userEmailAddress, userEmailAddressVerified) {
  return (
    <div>
      Signed in as
      <br />
      <strong>
        {getUserDisplayName(userDisplayName)}
          ({userEmailAddress.concat(userEmailAddressVerified ? '' : ', Email address not verified')})
      </strong>
    </div>
  );
}

function getUserImageOrDisplayName(userDisplayName, userPhotoUrl) {
  return userPhotoUrl ?
    (
      <span>
        <Image
          src={userPhotoUrl}
          className="navbar-user-photo"
          rounded
        />
      </span>
    ) :
    (
      <span>
        {getUserDisplayName(userDisplayName)}
      </span>
    );
}

const UserMenuSignedInPresentational = ({
    userDisplayName,
    userEmailAddress,
    userEmailAddressVerified,
    userPhotoUrl,
    onSignOutMenuItemClicked,
  }) =>
    <Nav collapseOnSelect pullRight>
      <NavDropdown title={getUserImageOrDisplayName(userDisplayName, userPhotoUrl)} >
        <MenuItem disabled>
          {formatUserInfoToDisplay(userDisplayName, userEmailAddress, userEmailAddressVerified)}
        </MenuItem>
        <MenuItem divider />
        <LinkContainer to="/profile/public" >
          <MenuItem> My profile </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem onClick={() => onSignOutMenuItemClicked()}> Sign out </MenuItem>
      </NavDropdown>
      <span />
    </Nav>;

UserMenuSignedInPresentational.propTypes = {
  userDisplayName: PropTypes.string,
  userEmailAddress: PropTypes.string,
  userEmailAddressVerified: PropTypes.bool.isRequired,
  userPhotoUrl: PropTypes.string,
  onSignOutMenuItemClicked: PropTypes.func.isRequired,
};

export default UserMenuSignedInPresentational;
