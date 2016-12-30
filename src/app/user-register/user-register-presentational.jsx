import React from 'react';
import {
  Col,
} from 'react-bootstrap';
import UsernameEmailPasswordContainer from './username-email-password-container';
import SocialLoginContainer from '../social-login/social-login-container';

const UserRegisterPresentational = () =>
  <Col
    smOffset={2}
    sm={8}
    mdOffset={3}
    md={6}
    lgOffset={4}
    lg={4}
  >
    <UsernameEmailPasswordContainer />
    <h3 className="user-register-divider">
      <span>or</span>
    </h3>
    <SocialLoginContainer register />
  </Col>;

export default UserRegisterPresentational;
