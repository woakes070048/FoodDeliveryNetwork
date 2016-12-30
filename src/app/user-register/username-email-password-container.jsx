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
import UsernameEmailPasswordPresentational from './username-email-password-presentational';

class UsernameEmailPasswordContainer extends Component {
  render() {
    return (< UsernameEmailPasswordPresentational />);
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

export default connect(mapStateToProps, mapDispatchToProps)(UsernameEmailPasswordContainer);
