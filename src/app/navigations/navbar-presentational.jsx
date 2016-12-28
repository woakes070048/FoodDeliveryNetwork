import React from 'react';
import {
    Navbar,
    Grid, Row, Col,
} from 'react-bootstrap';
import {
  IndexLinkContainer,
} from 'react-router-bootstrap';
import NavbarUserMenuPresentational from './navbar-usermenu-presentational';

const NavbarPresentational = () =>
  <Grid>
    <Row>
      <Col
        xs={11}
        sm={11}
        md={11}
        lg={11}
      >
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
        </Navbar>

      </Col>
    </Row>
  </Grid>;

export default NavbarPresentational;
