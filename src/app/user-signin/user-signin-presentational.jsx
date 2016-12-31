import React from 'react';
import {
  Col,
} from 'react-bootstrap';
import UsernameEmailPasswordContainer from './username-email-password-container';
import SocialSignInContainer from '../social-signin/social-signin-container';

const UserSignInPresentational = () =>
  <Col
    smOffset={2}
    sm={8}
    mdOffset={3}
    md={6}
    lgOffset={4}
    lg={4}
  >
    <UsernameEmailPasswordContainer />
    <h3 className="user-signin-divider">
      <span>or</span>
    </h3>
    <SocialSignInContainer signin />
  </Col>;

export default UserSignInPresentational;
