import React, {
  Component,
  PropTypes,
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
  constructor(props) {
    super(props);

    this.validateState = this.validateState.bind(this);
    this.onSignInClicked = this.onSignInClicked.bind(this);
  }

  onSignInClicked(usernameOrEmailAddress, password) {
    this.props.firebaseActions.signInWithUsernameOrEmailAndPassword(usernameOrEmailAddress, password);
  }

  validateState(usernameOrEmailAddress, password) {
    return {
      usernameOrEmailAddressValidationResult: usernameOrEmailAddress ? null : 'error',
      usernameOrEmailAddressValidationMessage: usernameOrEmailAddress ? null : 'Username or email is required.',
      passwordValidationResult: password ? null : 'error',
      passwordValidationMessage: password ? null : 'Password is required.',
    };
  }

  render() {
    return (
      <UsernameEmailPasswordPresentational
        onSignInClicked={(usernameOrEmailAddress, password) =>
              this.onSignInClicked(usernameOrEmailAddress, password)}
        validateState={(usernameOrEmailAddress, password) =>
              this.validateState(usernameOrEmailAddress, password)}
      />
    );
  }
}

UsernameEmailPasswordContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernameEmailPasswordContainer);
