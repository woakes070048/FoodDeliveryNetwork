import React from 'react';
import {
    Navbar,
} from 'react-bootstrap';
import {
  IndexLinkContainer,
} from 'react-router-bootstrap';
import NavbarUserMenuPresentation from './navbar-usermenu-presentation';

const NavbarPresentation = () =>
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <IndexLinkContainer to="/">
                    <a>
                        Food Delivery Network
                    </a>
                </IndexLinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <NavbarUserMenuPresentation />
        </Navbar.Collapse>
    </Navbar>;

export default NavbarPresentation;
