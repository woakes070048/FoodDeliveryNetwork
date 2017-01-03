import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import UserResetPasswordPresentational from './user-reset-password-presentational';

class UserResetPasswordContainer extends Component {
  render() {
    return (
      <UserResetPasswordPresentational />
    );
  }
}

function mapStateToProps(state) {
  return {
    userExists: state.firebase.userInfo.userExists,
  };
}

export default connect(mapStateToProps)(UserResetPasswordContainer);
