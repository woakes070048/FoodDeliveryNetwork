import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserLoginPresentational from './user-login-presentational';

class UserLoginContainer extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <UserLoginPresentational />
    );
  }
}

function mapStateToProps(state) {
  const userInfo = state.firebase.userInfo;

  if (userInfo.userExists) {
    return {
      userExists: true,
    };
  }

  return {
    userExists: false,
  };
}

export default connect(mapStateToProps)(UserLoginContainer);
