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
  }

  onSignOutMenuItemClicked() {
    this.props.firebaseActions.logout();
  }

  render() {
    if (this.props.userExists) {
      return (
        <UserMenuSignedInPresentational
          userDisplayName={this.props.userDisplayName}
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
  userPhotoUrl: PropTypes.string,
};

function mapStateToProps(state) {
  const userInfo = state.firebase.userInfo;

  if (userInfo.userExists) {
    return {
      userExists: true,
      userDisplayName: userInfo.displayName,
      userPhotoUrl: userInfo.photoUrl,
    };
  }

  return {
    userExists: false,
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
