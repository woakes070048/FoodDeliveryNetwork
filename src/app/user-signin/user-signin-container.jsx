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
import UserSignInPresentational from './user-signin-presentational';

function getRedirectPath(props) {
  return props.location.state && props.location.state.nextPathname ? props.location.state.nextPathname : '/';
}

class UserSignInContainer extends Component {
  componentWillMount() {
    if (this.props.userExists) {
      browserHistory.push(this.props.redirectPath);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push(nextProps.redirectPath);
    }
  }

  render() {
    return (
      <UserSignInPresentational />
    );
  }
}

UserSignInContainer.propTypes = {
  userExists: PropTypes.bool,
  redirectPath: PropTypes.string,
};

UserSignInContainer.defaultProps = {
  userExists: false,
  redirectPath: '',
};

function mapStateToProps(state, ownProps) {
  return {
    userExists: state.userAccess.userInfo.userExists,
    redirectPath: getRedirectPath(ownProps),
  };
}

export default connect(mapStateToProps)(UserSignInContainer);
