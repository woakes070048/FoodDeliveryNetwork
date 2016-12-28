import React from 'react';
import {
    Navbar,
} from 'react-bootstrap';
import {
  IndexLinkContainer,
} from 'react-router-bootstrap';
import NavbarUserMenuPresentational from './navbar-usermenu-presentational';

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
      <NavbarUserMenuPresentational />
    </Navbar.Collapse>
  </Navbar>;

export default NavbarPresentational;
