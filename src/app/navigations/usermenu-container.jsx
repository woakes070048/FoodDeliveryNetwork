import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  bindActionCreators,
} from 'redux';
import UserMenuSignedInPresentational from './usermenu-signedin-presentational';
import UserMenuSignedOutPresentational from './usermenu-signedout-presentational';
import * as firebaseActions from '../firebase/actions';

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
        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);
      }
    }
  }

  onSignOutMenuItemClicked() {
    this.setState({
      lastOperationId: this.props.firebaseActions.signOut()
        .operationId,
    });
  }

  render() {
    if (this.props.userExists) {
      return (
        <UserMenuSignedInPresentational
          userDisplayName={this.props.userDisplayName}
          userEmailAddress={this.props.userEmailAddress}
          userPhotoUrl={this.props.userPhotoUrl}
          onSignOutMenuItemClicked={() => this.onSignOutMenuItemClicked()}
        />
      );
    }

    return (
      <UserMenuSignedOutPresentational />
    );
  }
}

UserMenuContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired,
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
    userEmailAddress: userInfo.email,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserMenuContainer);
