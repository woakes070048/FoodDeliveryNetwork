import NotificationSystem from 'react-notification-system';
import React, {
  Component,
  PropTypes,
} from 'react';
import NavbarContainer from './navigations/navbar-container';

class AppPresentational extends Component {
  componentDidUpdate() {
    if (this.props.notifications) {
      this.props.notifications.forEach((notification) => {
        this.notificationSystem.addNotification({
          message: notification.message,
          level: notification.level,
          position: notification.position,
        });
      });
    }
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <div className="container-fluid">
          {this.props.nestedChildren}
        </div>
        <NotificationSystem ref={(component) => { this.notificationSystem = component; }} />
      </div>

    );
  }
}

AppPresentational.propTypes = {
  nestedChildren: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notifications: PropTypes.array,
};

export default AppPresentational;
