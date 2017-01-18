import React, {
  PropTypes,
} from 'react';
import {
  Col,
  Nav,
  NavItem,
  Panel,
} from 'react-bootstrap';
import {
  LinkContainer,
} from 'react-router-bootstrap';
import AccountContainer from './account/account-container';
import EmailsContainer from './emails/emails-container';
import PublicContainer from './public/public-container';

function getProfileSubItem(selectedProfileSubItem) {
  switch (selectedProfileSubItem) {
  case 'public':
    return {
      activeKey: 1,
      component: <PublicContainer />,
    };

  case 'account':
    return {
      activeKey: 2,
      component: <AccountContainer />,
    };

  case 'emails':
    return {
      activeKey: 3,
      component: <EmailsContainer />,
    };

  default:
    return {
      activeKey: 1,
      component: <PublicContainer />,
    };
  }
}

const UserProfilePresentational = ({
    selectedProfileSubItem,
  }) => {
  const profileSubItem = getProfileSubItem(selectedProfileSubItem);

  return (
    <div>
      <Col
        smOffset={1}
        sm={2}
        mdOffset={1}
        md={2}
        lgOffset={1}
        lg={2}
      >
        <Panel>
          <Nav bsStyle="pills" stacked activeKey={profileSubItem.activeKey}>
            <LinkContainer to="/profile/public" >
              <NavItem>Profile</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile/account" >
              <NavItem>Account</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile/emails" >
              <NavItem>Emails</NavItem>
            </LinkContainer>
          </Nav>
        </Panel>
      </Col>
      <Col
        smOffset={3}
        mdOffset={3}
        lgOffset={3}
      >
        {profileSubItem.component}
      </Col>
    </div>
  );
};

UserProfilePresentational.propTypes = {
  selectedProfileSubItem: PropTypes.string,
};

UserProfilePresentational.defaultProps = {
  selectedProfileSubItem: 'public',
};

export default UserProfilePresentational;
