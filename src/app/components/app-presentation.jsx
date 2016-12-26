import React from 'react';
import {
  Panel,
} from 'react-bootstrap';
import NavbarPresentation from './navigations/navbar-presentation';

const AppPresentation = (props) =>
  <div>
    <NavbarPresentation />
    <Panel>
      Food Delivery Network App Presentation
    </Panel>
  </div>;

export default AppPresentation;
