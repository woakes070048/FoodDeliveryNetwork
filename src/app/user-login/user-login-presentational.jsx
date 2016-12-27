import React from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import UserLoginEmailPasswordContainer from './user-login-email-password-container';
import SocialLoginContainer from '../social-login/social-login-container';

const UserLoginPresentational = () =>
  <Grid>
    <Row>
      <UserLoginEmailPasswordContainer />
    </Row>
    <Row>
      <Col
        xs={12}
        sm={10}
        smOffset={1}
        md={8}
        mdOffset={2}
        lg={6}
        lgOffset={3}
      >
        <h3 className="user-register-divider">
          <span>or</span>
        </h3>
      </Col>
    </Row>
    <Row>
      <SocialLoginContainer />
    </Row>
  </Grid>;

export default UserLoginPresentational;