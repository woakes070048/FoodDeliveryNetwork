import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserSignUpPresentational from './user-signup-presentational';

class UserSignUpContainer extends Component {
  static redirectIfRequired(userExists) {
    if (userExists) {
      browserHistory.push('/');
    }
  }

  componentWillMount() {
    UserSignUpContainer.redirectIfRequired(this.props.userExists);
  }

  componentWillReceiveProps(nextProps) {
    UserSignUpContainer.redirectIfRequired(nextProps.userExists);
  }

  render() {
    return (
      <UserSignUpPresentational />
    );
  }
}

UserSignUpContainer.propTypes = {
  userExists: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    userExists: state.firebase.userInfo.userExists,
  };
}

export default connect(mapStateToProps)(UserSignUpContainer);
