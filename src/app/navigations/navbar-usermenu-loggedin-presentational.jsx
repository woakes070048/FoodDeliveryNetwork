import React from 'react';
import {
  MenuItem,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

const NavbarUserMenuLoggedOutPresentational = () =>
  <Nav pullRight>
    <NavDropdown title="Morteza Alizadeh">
      <MenuItem> Logout </MenuItem>
    </NavDropdown>
  </Nav>;

export default NavbarUserMenuLoggedOutPresentational;
