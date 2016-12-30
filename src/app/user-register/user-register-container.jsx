import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserRegisterPresentational from './user-register-presentational';

class UserRegisterContainer extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <UserRegisterPresentational />
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

export default connect(mapStateToProps)(UserRegisterContainer);
