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
import * as userAccessActions from '../user-access/actions';
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

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  onSignOutMenuItemClicked() {
    this.setState({
      lastOperationId: this.props.userAccessActions.signOut()
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
          userEmailAddressVerified={this.props.userEmailAddressVerified}
          userPhotoUrl={this.props.userPhotoUrl}
          onSignOutMenuItemClicked={this.onSignOutMenuItemClicked}
        />
      ) : (<UserMenuSignedOutPresentational />);
  }
}

UserMenuContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userExists: PropTypes.bool.isRequired,
  userDisplayName: PropTypes.string,
  userEmailAddress: PropTypes.string,
  userEmailAddressVerified: PropTypes.bool,
  userPhotoUrl: PropTypes.string,
};

UserMenuContainer.defaultProps = {
  userDisplayName: '',
  userEmailAddress: '',
  userEmailAddressVerified: false,
  userPhotoUrl: '',
};

function getDisplayName(publicProfileDetails) {
  if (!publicProfileDetails) {
    return 'Unknown';
  }

  if (publicProfileDetails.preferredName) {
    return publicProfileDetails.preferredName;
  }

  const displayName = (
      `${publicProfileDetails.firstName} ${publicProfileDetails.middleName} ${publicProfileDetails.lastName}`)
    .trim();

  return displayName || 'Unknown';
}

function mapStateToProps(state) {
  const operations = state.userAccess.operations;
  const userInfo = state.userAccess.userInfo;
  const publicProfileDetails = state.userAccess.userInfo.publicProfileDetails;

  return userInfo.userExists ? {
    userExists: true,
    userEmailAddress: userInfo.emailAddress,
    userEmailAddressVerified: userInfo.emailAddressVerified,
    userDisplayName: getDisplayName(publicProfileDetails),
    userPhotoUrl: publicProfileDetails ? publicProfileDetails.photoUrl : '',
    operations,
  } : {
    userExists: false,
    operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserMenuContainer);
