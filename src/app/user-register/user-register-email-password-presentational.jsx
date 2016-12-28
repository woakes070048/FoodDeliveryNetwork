import React from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

const UserRegisterEmailPasswordPresentational = () =>
  <Form horizontal>
    <FormGroup>
      <Col
        xs={2}
        sm={2}
        md={2}
        lg={2}
      >
          Email
      </Col>
      <Col
        xs={9}
        smOffset={1}
        sm={9}
        mdOffset={1}
        md={9}
        lgOffset={1}
        lg={9}
      >
        <FormControl
          type="email"
          placeholder="Email"
        />
      </Col>
    </FormGroup>
    <FormGroup>
      <Col
        xs={2}
        sm={2}
        md={2}
        lg={2}
      >
          Password
      </Col>
      <Col
        xs={9}
        smOffset={1}
        sm={9}
        mdOffset={1}
        md={9}
        lgOffset={1}
        lg={9}
      >
        <FormControl
          type="password"
          placeholder="Password"
        />
      </Col>
    </FormGroup>
    <FormGroup>
      <Col
        xs={2}
        sm={2}
        md={2}
        lg={2}
      >
          Re-enter Password
      </Col>
      <Col
        xs={9}
        smOffset={1}
        sm={9}
        mdOffset={1}
        md={9}
        lgOffset={1}
        lg={9}
      >
        <FormControl
          type="password"
          placeholder="Re-enter Password"
        />
      </Col>
    </FormGroup>
    <FormGroup>
      <Col
        xsOffset={2}
        smOffset={3}
        mdOffset={3}
        lgOffset={3}
      >
        <Button
          type="submit"
          bsStyle="primary"
        >
          Login
        </Button>
      </Col>
    </FormGroup>
  </Form>;

export default UserRegisterEmailPasswordPresentational;
