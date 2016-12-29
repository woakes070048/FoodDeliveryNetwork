import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import UserMenuLoggedInPresentational from './usermenu-loggedin-presentational';
import UserMenuLoggedOutPresentational from './usermenu-loggedout-presentational';

class UserMenuContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.userExists) {
      return (
        <UserMenuLoggedInPresentational
          userDisplayName={this.props.userDisplayName}
          userPhotoUrl={this.props.userPhotoUrl}
        />
      );
    }

    return (
      <UserMenuLoggedOutPresentational />
    );
  }
}

UserMenuContainer.propTypes = {
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

export default connect(mapStateToProps, null, null, {
  pure: false,
})(UserMenuContainer);
