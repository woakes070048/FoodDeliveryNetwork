import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserProfilePresentational from './user-profile-presentational';

class UserProfileContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');
    }
  }

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
