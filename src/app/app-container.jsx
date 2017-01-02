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

  render() {
    return (
      <AppPresentational
        children={this.props.children}
        notifications={this.props.notifications}
      />
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
  firebaseActions: PropTypes.object.isRequired,
  notifications: PropTypes.array,
};

function mapStateToProps(state) {
  const notifications = state.firebase.operations.filter(operation => operation.failed)
    .map(operation => ({
      message: operation.errorMessage,
      level: operation.errorLevel,
      position: 'br',
    }));

  return {
    notifications,
    operations: state.firebase.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
