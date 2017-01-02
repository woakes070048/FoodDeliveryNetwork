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
  componentWillReceiveProps(nextProps) {
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
  return {
    userExists: state.firebase.userInfo.userExists,
  };
}

export default connect(mapStateToProps)(UserSignUpContainer);
