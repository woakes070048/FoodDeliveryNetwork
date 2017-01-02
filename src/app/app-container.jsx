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

    this.props.firebaseActions.fetchUser();
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
