import React, {
  PropTypes,
} from 'react';
import {
  Col,
  Grid,
  Nav,
  NavItem,
} from 'react-bootstrap';
import {
  LinkContainer,
} from 'react-router-bootstrap';
import PublicContainer from './public/public-container';

function getActiveKey(selectedProfileSubItem) {
  switch (selectedProfileSubItem) {
  case 'public':
    return 1;

  default:
    return -1;
  }
}

const UserProfilePresentational = ({
    selectedProfileSubItem,
  }) =>
    <Grid>
      <Col
        sm={2}
        md={2}
        lg={2}
      >
        <Nav bsStyle="pills" stacked activeKey={getActiveKey(selectedProfileSubItem)}>
          <LinkContainer to="/profile/public" >
            <NavItem>Public profile</NavItem>
          </LinkContainer>
        </Nav>
      </Col>
      <Col
        smOffset={2}
        mdOffset={2}
        lgOffset={2}
      >
        <PublicContainer />
      </Col>
    </Grid>;

UserProfilePresentational.propTypes = {
  selectedProfileSubItem: PropTypes.string,
};

export default UserProfilePresentational;
