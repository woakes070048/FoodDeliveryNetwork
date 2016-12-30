import React from 'react';
import {
  Col,
} from 'react-bootstrap';
import UserLoginEmailPasswordContainer from './user-login-email-password-container';
import SocialLoginContainer from '../social-login/social-login-container';

const UserLoginPresentational = () =>
  <Col
    smOffset={2}
    sm={8}
    mdOffset={3}
    md={6}
    lgOffset={4}
    lg={4}
  >
    <UserLoginEmailPasswordContainer />
    <h3 className="user-register-divider">
      <span>or</span>
    </h3>
    <SocialLoginContainer login />
  </Col>;

export default UserLoginPresentational;
