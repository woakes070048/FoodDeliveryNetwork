import React from 'react';
import {
  Nav,
  NavItem,
} from 'react-bootstrap';
import {
  LinkContainer,
} from 'react-router-bootstrap';

const UserMenuLoggedOutPresentational = () =>
  <Nav pullRight>
    <LinkContainer to="/login" >
      <NavItem> Login </NavItem>
    </LinkContainer>
    <LinkContainer to="/register" >
      <NavItem> Register </NavItem>
    </LinkContainer>
  </Nav>;

export default UserMenuLoggedOutPresentational;