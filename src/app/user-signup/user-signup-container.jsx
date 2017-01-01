import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserSignUpPresentational from './user-signup-presentational';

class UserSignUpContainer extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <UserSignUpPresentational />
    );
  }
}

function mapStateToProps(state) {
  const userInfo = state.firebase.userInfo;

  return userInfo.userExists ? {
    userExists: true,
  } : {
    userExists: false,
  };
}

export default connect(mapStateToProps)(UserSignUpContainer);
