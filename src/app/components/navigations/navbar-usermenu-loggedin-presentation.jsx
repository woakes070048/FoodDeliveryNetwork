import React from 'react';
import {
  MenuItem,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

const NavbarUserMenuLoggedOutPresentation = () =>
    <Nav pullRight>
        <NavDropdown title="Morteza Alizadeh">
            <MenuItem>
                Logout
            </MenuItem>
        </NavDropdown>
    </Nav>;

export default NavbarUserMenuLoggedOutPresentation;
