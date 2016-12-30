import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup,
} from 'react-bootstrap';

const UserLoginEmailPasswordPresentational = () =>
  <Form horizontal>
    <FormGroup>
      <InputGroup>
        <InputGroup.Addon>
          <Glyphicon glyph="user" />
        </InputGroup.Addon>
        <FormControl type="text" placeholder="Username or email" />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <InputGroup>
        <InputGroup.Addon>
          <Glyphicon glyph="lock" />
        </InputGroup.Addon>
        <FormControl type="password" placeholder="Password" />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Button
        type="submit"
        bsStyle="primary"
        block
      >
       Login
     </Button>
    </FormGroup>
  </Form>;

export default UserLoginEmailPasswordPresentational;
