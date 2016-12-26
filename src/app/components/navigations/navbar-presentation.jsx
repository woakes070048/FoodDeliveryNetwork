import React from 'react';
import {
  Navbar,
} from 'react-bootstrap';
import NavbarUserMenuPresentation from './navbar-usermenu-presentation';

const NavbarPresentation = () =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <div>
          Food Delivery Network
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <NavbarUserMenuPresentation />
    </Navbar.Collapse>
  </Navbar>;

export default NavbarPresentation;
