import React, {
  PropTypes,
} from 'react';
import {
  Glyphicon,
  Image,
  MenuItem,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
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

function getEmailAddressVerifiedWarningIcon(userEmailAddressVerified) {
  return userEmailAddressVerified ?
    (<span />) :
    (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="emailAddressVerifiedWarningTooltip">Email address not verified.</Tooltip>}
      >
        <Glyphicon
          glyph="warning-sign"
          className="warning-icon"
        />
      </OverlayTrigger>);
}

function getUserImageOrDisplayName(userDisplayName, userPhotoUrl, userEmailAddressVerified) {
  return userPhotoUrl ?
    (
      <span>
        <Image
          src={userPhotoUrl}
          className="navbar-user-photo"
          rounded
        />
        {getEmailAddressVerifiedWarningIcon(userEmailAddressVerified)}
      </span>
    ) :
    (
      <span>
        {getUserDisplayName(userDisplayName)}
        {getEmailAddressVerifiedWarningIcon(userEmailAddressVerified)}
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
      <NavDropdown title={getUserImageOrDisplayName(userDisplayName, userPhotoUrl, userEmailAddressVerified)} >
        <MenuItem disabled>
          {formatUserInfoToDisplay(userDisplayName, userEmailAddress)}
        </MenuItem>
        <MenuItem divider />
        <LinkContainer to="/profile/public" >
          <MenuItem> My profile </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem onClick={() => onSignOutMenuItemClicked()}> Sign out </MenuItem>
      </NavDropdown>
    </Nav>;

UserMenuSignedInPresentational.propTypes = {
  userDisplayName: PropTypes.string,
  userEmailAddress: PropTypes.string,
  userEmailAddressVerified: PropTypes.bool.isRequired,
  userPhotoUrl: PropTypes.string,
  onSignOutMenuItemClicked: PropTypes.func.isRequired,
};

export default UserMenuSignedInPresentational;
