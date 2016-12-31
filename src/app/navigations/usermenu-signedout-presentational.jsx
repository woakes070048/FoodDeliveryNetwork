import React from 'react';
import {
  Nav,
  NavItem,
} from 'react-bootstrap';
import {
  LinkContainer,
} from 'react-router-bootstrap';

const UserMenuSignedOutPresentational = () =>
  <Nav pullRight>
    <LinkContainer to="/signin" >
      <NavItem> Sign in </NavItem>
    </LinkContainer>
    <LinkContainer to="/signup" >
      <NavItem> Sign up </NavItem>
    </LinkContainer>
  </Nav>;

export default UserMenuSignedOutPresentational;
