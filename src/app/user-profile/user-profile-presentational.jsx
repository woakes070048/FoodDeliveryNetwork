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
        sm={2}
        md={2}
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
          </Nav>
        </Panel>
      </Col>
      <Col
        smOffset={2}
        mdOffset={2}
        lgOffset={2}
      >
        {profileSubItem.component}
      </Col>
    </div>
  );
};

UserProfilePresentational.propTypes = {
  selectedProfileSubItem: PropTypes.string,
};

export default UserProfilePresentational;
