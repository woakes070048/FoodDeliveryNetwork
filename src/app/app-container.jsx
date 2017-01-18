import React, {
  Component,
  PropTypes,
} from 'react';
import {
  bindActionCreators,
} from 'redux';
import {
  connect,
} from 'react-redux';
import AppPresentational from './app-presentational';
import * as userAccessActions from './user-access/actions';
import * as loadingActions from './loading/actions';
import * as notificationActions from './notification/actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastOperationId: this.props.userAccessActions.fetchUser()
        .operationId,
    };

    this.props.loadingActions.startMain();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  componentDidUpdate() {
    this.props.notifications.forEach(notification => this.props.notificationActions.added(notification.notificationId));
  }

  render() {
    return (
      <AppPresentational
        nestedChildren={this.props.children}
        notifications={this.props.notifications}
        loadingState={this.props.loadingState}
      />
    );
  }
}

AppContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingState: PropTypes.string,
  notifications: PropTypes.arrayOf(
    React.PropTypes.shape({
      message: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }),
  ),
};

AppContainer.defaultProps = {
  loadingState: 'none',
  notifications: [],
};

function mapStateToProps(state) {
  return {
    notifications: state.notification,
    operations: state.userAccess.operations,
    loadingState: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
