import NotificationSystem from 'react-notification-system';
import Loader from 'react-loader';
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
        <Loader loaded={this.props.loadingState === 'none' || this.props.loadingState === 'transparent'} >
          <div className="container-fluid">
            {this.props.nestedChildren}
            <Loader loaded={this.props.loadingState === 'none' || this.props.loadingState === 'main'} />
          </div>
        </Loader>
        <NotificationSystem ref={(component) => { this.notificationSystem = component; }} />
      </div>

    );
  }
}

AppPresentational.propTypes = {
  nestedChildren: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notifications: PropTypes.arrayOf(
    React.PropTypes.shape({
      message: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }),
  ),
  loadingState: PropTypes.string,
};

AppPresentational.defaultProps = {
  loadingState: 'none',
};

export default AppPresentational;
