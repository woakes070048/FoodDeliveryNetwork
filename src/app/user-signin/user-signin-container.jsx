import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserSignInPresentational from './user-signin-presentational';

class UserSignInContainer extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <UserSignInPresentational />
    );
  }
}

function mapStateToProps(state) {
  return {
    userExists: state.firebase.userInfo.userExists,
  };
}

export default connect(mapStateToProps)(UserSignInContainer);
