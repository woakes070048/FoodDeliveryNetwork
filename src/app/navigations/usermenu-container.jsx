import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import {
  bindActionCreators,
} from 'redux';
import UserMenuSignedInPresentational from './usermenu-signedin-presentational';
import UserMenuSignedOutPresentational from './usermenu-signedout-presentational';
import * as firebaseActions from '../firebase/actions';
import * as loadingActions from '../loading/actions';
import * as notificationActions from '../notification/actions';

class UserMenuContainer extends Component {
  constructor(props) {
    super(props);

    this.onSignOutMenuItemClicked = this.onSignOutMenuItemClicked.bind(this);

    this.state = {
      lastOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        } else {
          this.props.notificationActions.addSuccess('You are successfully signed out.');
          browserHistory.push('/');
        }

        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  onSignOutMenuItemClicked() {
    this.setState({
      lastOperationId: this.props.firebaseActions.signOut()
        .operationId,
    });

    this.props.loadingActions.startTransparent();
  }

  render() {
    return this.props.userExists ?
      (
        <UserMenuSignedInPresentational
          userDisplayName={this.props.userDisplayName}
          userEmailAddress={this.props.userEmailAddress}
          userPhotoUrl={this.props.userPhotoUrl}
          onSignOutMenuItemClicked={() => this.onSignOutMenuItemClicked()}
        />
      ) : (<UserMenuSignedOutPresentational />);
  }
}

UserMenuContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userExists: PropTypes.bool.isRequired,
  userDisplayName: PropTypes.string,
  userEmailAddress: PropTypes.string,
  userPhotoUrl: PropTypes.string,
};

function mapStateToProps(state) {
  const operations = state.firebase.operations;
  const userInfo = state.firebase.userInfo;

  return userInfo.userExists ? {
    userExists: true,
    userDisplayName: userInfo.displayName,
    userEmailAddress: userInfo.emailAddress,
    userPhotoUrl: userInfo.photoUrl,
    operations,
  } : {
    userExists: false,
    operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserMenuContainer);
