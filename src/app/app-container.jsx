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
import * as notificationActions from './notification/actions';
import * as firebaseActions from './firebase/actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastOperationId: this.props.firebaseActions.fetchUser()
        .operationId,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);
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
      />
    );
  }
}

AppContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notifications: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    notifications: state.notification,
    operations: state.firebase.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
