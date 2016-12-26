import React from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

const UserLoginEmailPasswordPresentation = () =>
  <Col
        xs={12}
        smOffset={1}
        sm={10}
        mdOffset={2}
        md={8}
        lgOffset={3}
        lg={6}
    >
        <Form horizontal>
            <FormGroup>
                <Col sm={2}>
                    Email
                </Col>
                <Col sm={10}>
                    <FormControl
                        type="email"
                        placeholder="Email"
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={2}>
                    Password
                </Col>
                <Col sm={10}>
                    <FormControl
                        type="password"
                        placeholder="Password"
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button
                        type="submit"
                        bsStyle="primary"
                    >
                        Login
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    </Col>;

export default UserLoginEmailPasswordPresentation;
