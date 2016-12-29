import React from 'react';
import {
    Navbar,
} from 'react-bootstrap';
import {
  IndexLinkContainer,
} from 'react-router-bootstrap';
import UserMenuContainer from './usermenu-container';

const NavbarPresentational = () =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLinkContainer to="/">
          <a> Food Delivery Network </a>
        </IndexLinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <UserMenuContainer />
    </Navbar.Collapse>
  </Navbar>;

export default NavbarPresentational;
