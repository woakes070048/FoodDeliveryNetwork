import React from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import UserRegisterEmailPasswordContainer from './user-register-email-password-container';
import SocialLoginContainer from '../social-login/social-login-container';

const UserRegisterPresentational = () =>
  <Grid>
    <Row>
      <Col
        xsOffset={2}
        xs={8}
        smOffset={3}
        sm={6}
        mdOffset={4}
        md={4}
        lgOffset={4}
        lg={4}
      >
        <UserRegisterEmailPasswordContainer />
      </Col>
    </Row>
    <Row>
      <Col
        xsOffset={2}
        xs={7}
        smOffset={3}
        sm={6}
        mdOffset={4}
        md={4}
        lgOffset={4}
        lg={4}
      >
        <h3 className="user-register-divider">
          <span>or</span>
        </h3>
      </Col>
    </Row>
    <Row>
      <Col
        xsOffset={2}
        xs={8}
        smOffset={3}
        sm={6}
        mdOffset={4}
        md={4}
        lgOffset={4}
        lg={4}
      >
        <SocialLoginContainer register />
      </Col>
    </Row>
  </Grid>;

export default UserRegisterPresentational;
