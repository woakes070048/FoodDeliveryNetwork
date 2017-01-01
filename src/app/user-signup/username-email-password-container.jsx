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
    this.onSignUpClicked = this.onSignUpClicked.bind(this);
  }

  onSignUpClicked(usernameOrEmailAddress, password) {
    this.props.firebaseActions.signUpWithUsernameOrEmailAndPassword(usernameOrEmailAddress, password);
  }

  validateState(usernameOrEmailAddress, password, reEnteredPassword) {
    return {
      usernameOrEmailAddressValidationResult: usernameOrEmailAddress ? null : 'error',
      usernameOrEmailAddressValidationMessage: usernameOrEmailAddress ? null : 'Username or email is required.',
      passwordValidationResult: password ? null : 'error',
      passwordValidationMessage: password ? null : 'Password is required.',
      reEnteredPasswordValidationResult: reEnteredPassword === password ? null : 'error',
      reEnteredPasswordValidationMessage: reEnteredPassword === password ? null : 'Should match the above Password.',
    };
  }

  render() {
    return (
      <UsernameEmailPasswordPresentational
        onSignUpClicked={(usernameOrEmailAddress, password) =>
              this.onSignUpClicked(usernameOrEmailAddress, password)}
        validateState={(usernameOrEmailAddress, password, reEnteredPassword) =>
              this.validateState(usernameOrEmailAddress, password, reEnteredPassword)}
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
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernameEmailPasswordContainer);
