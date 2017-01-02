import NotificationSystem from 'react-notification-system';
import React, {
  Component,
  PropTypes,
} from 'react';
import NavbarContainer from './navigations/navbar-container';

class AppPresentational extends Component {
  componentDidMount() {
    if (this.props.notifications) {
      this.props.notifications.forEach((notification) => {
        this.notificationSystem.addNotification({
          message: notification.message,
          level: notification.level,
          position: 'br',
        });
      });
    }
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <div className="container-fluid">
          {this.props.children}
        </div>
        <NotificationSystem ref={(component) => { this.notificationSystem = component; }} />
      </div>

    );
  }
}

AppPresentational.propTypes = {
  children: PropTypes.object.isRequired,
  notifications: PropTypes.array,
};

export default AppPresentational;
