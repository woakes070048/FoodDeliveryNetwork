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
import UserMenuLoggedInPresentational from './usermenu-loggedin-presentational';
import UserMenuLoggedOutPresentational from './usermenu-loggedout-presentational';
import * as firebaseActions from '../firebase/actions';

class UserMenuContainer extends Component {
  constructor(props) {
    super(props);

    this.onLogoutMenuItemClicked = this.onLogoutMenuItemClicked.bind(this);
  }

  onLogoutMenuItemClicked() {
    this.props.firebaseActions.logout();
  }

  render() {
    if (this.props.userExists) {
      return (
        <UserMenuLoggedInPresentational
          userDisplayName={this.props.userDisplayName}
          userPhotoUrl={this.props.userPhotoUrl}
          onLogoutMenuItemClicked={() => this.onLogoutMenuItemClicked()}
        />
      );
    }

    return (
      <UserMenuLoggedOutPresentational />
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
