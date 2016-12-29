import React, {
  Component,
} from 'react';
import {
  bindActionCreators,
} from 'redux';
import {
  connect,
} from 'react-redux';
import * as firebaseActions from '../firebase/actions';
import UserRegisterEmailPasswordPresentational from './user-register-email-password-presentational';

class UserRegisterEmailPasswordContainer extends Component {
  render() {
    return (< UserRegisterEmailPasswordPresentational />);
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterEmailPasswordContainer);
