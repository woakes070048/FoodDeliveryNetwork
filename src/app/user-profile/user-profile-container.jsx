import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import UserProfilePresentational from './user-profile-presentational';

class UserProfileContainer extends Component {
  render() {
    return (
      <UserProfilePresentational />
    );
  }
}

function mapStateToProps(state) {
  return {
    userExists: state.firebase.userInfo.userExists,
  };
}

export default connect(mapStateToProps)(UserProfileContainer);
