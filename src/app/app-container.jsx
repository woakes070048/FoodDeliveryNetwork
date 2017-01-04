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
import * as firebaseActions from './firebase/actions';
import * as loadingActions from './loading/actions';
import * as notificationActions from './notification/actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastOperationId: this.props.firebaseActions.fetchUser()
        .operationId,
    };

    this.props.loadingActions.startMain();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);

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
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingState: PropTypes.string,
  notifications: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    notifications: state.notification,
    operations: state.firebase.operations,
    loadingState: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
